var debug = require('debug')('server');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require("mongoose");
var models = require("./mongo/collectionsModels");
var routes = require('./routes/index');
var users = require('./routes/users');
var mealtags = require('./routes/mealtags');
var restaurants = require('./routes/restaurants');
var reservations = require('./routes/reservations');
var momentums = require('./routes/momentums');
var medias = require('./routes/medias');
// var meals = require('./routes/meals');
// var pictures = require('./routes/pictures');

//process.env.dbUrl = "mongodb://localhost:27017/foodies";
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


var TWITTER_CONSUMER_KEY = "AcaRiONag66pCrDaYg6m6iDrK"
var TWITTER_CONSUMER_SECRET = "1ZDozaYSRInUVQESgBpcCPPQwxYbSwCIUuxnielqUWL0dZPjyu";
var TWITTER_TOKEN = "1304659981-sTDXn6RKGHftxKgtmlJLdpvQUurdtr5geGqfQ6b";
var TWITTER_TOKEN_KEY = "HQvbTlnWXk3hURQv25kB1sgMuxoz8eI3tNooSUs8AlZbB";

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    token : TWITTER_TOKEN,
    tokenSecret : TWITTER_TOKEN_KEY,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
    }, function(token, tokenSecret, profile, done) {
        var userTwitter = profile._json;
        userTwitter.username = profile._json.screen_name;
        userTwitter.token = token;
        userTwitter.tokenSecret = tokenSecret;
        userTwitter.provider = 'twitter';
        userTwitter.picture_path = profile._json.profile_image_url;
        models.Users.find({token: token, tokenSecret: tokenSecret}, function(err, docs) {
            if (err) {
                return (done(null, null));
            } else if (docs && docs.length > 0) {
                var user = docs[0];
                user.id = user._id;
                return (done(null, user));
            } else {
                var user = new models.Users(userTwitter);
                user.save(function(err, userInserted) {
                    if (err) {
                        return (done(null, null));
                    } else {
                        return (done(null, userInserted));
                    }
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.Users.findById(id, function(err, user) {
        done(err, user);
    });
});

/* Multer configuration */
/* TODO
    Find a filesystem manager to create directories and delete files
*/
app.use(multer({dest : './uploads/',
    rename : function(fieldname, filename, req, res){
        return filename + Date.now();
    },

    /*changeDest: function(dest, req, res) {
       var stat = null;
        dest = dest + '/test';
        try {
            // using fs.statSync; NOTE that fs.existsSync is now deprecated; fs.accessSync could be used but is only nodejs >= v0.12.0
            stat = fs.statSync(dest);
        } catch(err) {
            // for nested folders, look at npm package "mkdirp"
            fs.mkdirSync(dest);
        }
        if (stat && !stat.isDirectory()) {
            // Woh! This file/link/etc already exists, so isn't a directory. Can't save in it. Handle appropriately.
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        return dest;
    },
*/
    onFileUploadStart : function(file)
    {
        // Check file.originalName for allowed formats
    },

    onFileUploadComplete : function() {

    }
}));

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

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/error'
}));

app.get('/logout', function(req, res) {
    if (req.user) {
        req.logout();
        res.redirect('/');
    } else {
        res.status(403).send('Forbidden');
    }
});

app.get('/auth/info', function(req, res) {
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(403).send('Forbidden');
    }
});

app.use('/', routes);
app.use('/foodie', users);
app.use('/restaurants', restaurants);
app.use('/mealtags', mealtags);
app.use('/momentums', momentums);
app.use('/media', medias);
app.use('/reservations', reservations);

/*
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