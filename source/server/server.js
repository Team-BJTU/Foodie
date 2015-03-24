var debug = require('debug')('server');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var models = require("./mongo/collectionsModels");
var routes = require('./routes/index');
var users = require('./routes/users');
var mealtags = require('./routes/mealtags');
var restaurants = require('./routes/restaurants');
// var reservations = require('./routes/reservations');
var momentums = require('./routes/momentums');
// var meals = require('./routes/meals');
// var pictures = require('./routes/pictures');

process.env.dbUrl = "mongodb://" + process.env.npm_package_database_host + "/" + process.env.npm_package_database_dbname;
mongoose.connect(process.env.dbUrl);

var db = mongoose.connection;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'mabjew' }));
app.use(passport.initialize());
app.use(passport.session());


/* Passport initialisation for Local Authentification */
passport.use(new LocalStrategy(
  function(username, password, done) {
    models.Users.findOne({ username: username, is_active : true}, function(err, user) {
      if (err)
        return done(err);
      if (!user)
        return done(null, false, { message: 'Incorrect username.' });
      if (user.password != password)
        return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.Users.findById(id, function(err, user){
        done(err, user);
    });
});

/// Init database access
app.use(function(req, res, next) {
    res.contentType('application/json');
    db.on("error", console.error.bind(console, "Database Connection Error: "));
    db.once("open", function() {
        console.log("You're now connected to " + process.env.dbUrl);
    });
    req.db = db;
    req.models = models;
    next();
});

app.use('/', routes);
app.use('/foodie', users);
app.use('/restaurants', restaurants);
app.use('/mealtags', mealtags);
app.use('/momentums', momentums);
/*app.use('/reservations', reservations);


app.use('/meals', meals);
app.use('/picures', picures);
*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
