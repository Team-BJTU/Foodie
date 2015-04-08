package nourriture.teambjtu.com.foodie;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.json.JSONObject;

import java.io.InputStream;
import java.util.List;


public class MainActivity extends ActionBarActivity {

    /*private static final String TAG_ID = "_id";
    private static final String TAG_USERNAME = "username";
    private static final String TAG_PASSWORD = "password";
    private static final String TAG_EMAIL = "mail";
    private static final String TAG_CITY = "city";
    private static final String TAG_BIRTHDATE = "birthDate";
    private static final String TAG_ISADMIN = "is_admin";
    private static final String TAG_V = "__v";
    private static final String TAG_DATEUPDATED = "date_updated";
    private static final String TAG_DATECREATED = "date_created";
    private static final String TAG_LASTLOGIN = "last_login";
    private static final String TAG_SEXE = "sexe";
    private static final String TAG_ISACTIVE = "is_active";

    String id;
    String username;
    String password;
    String email = "mail";
    String city = "city";
    String birthdate = "birthDate";
    String isadmin = "is_admin";
    String v = "__v";
    String dateupdated = "date_updated";
    String datecreated = "date_created";
    String lastlogin = "last_login";
    String sexe = "sexe";
    String isactive = "is_active"; */

    public EditText LoginEditText;
    public EditText PasswordEditText;

    public String Login;
    public String Password;

    public String showResult;

    public static HttpClient httpclient = new DefaultHttpClient();

    public static final CookieStore store = ((DefaultHttpClient) httpclient).getCookieStore();

    public static List<Cookie> cookies = store.getCookies();

    public static String[] cookieArray = new String[cookies.size()];




    public void CreateAnAccount(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, CreateAccountActivity.class);
        startActivity(intent);
    }

    public void FoodieMainPage(View view)
    {
        Login = LoginEditText.getText().toString();
        Password = PasswordEditText.getText().toString();

        new AuthenticationNetworkAsyncTask().execute();

    }

    @SuppressWarnings("deprecation")
    public static String  doAuthentication(String user, String password) {

        String result = "";

        HttpPost httppost = new HttpPost("http://192.168.56.1:3000/foodie/login");
        String request = null;
        InputStream inputStream = null;

        try
        {
            HttpResponse httpResponse = httpclient.execute(httppost);
            //List<Cookie> cookies = store.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    System.out.println("Name ["+c.getName()+"] - Val ["+c.getValue()+"] - Domain ["+c.getDomain()+"] - Path ["+c.getPath()+"]");
                            store.addCookie(c);
                }
            }

            HttpContext ctx = new BasicHttpContext();
            ctx.setAttribute(ClientContext.COOKIE_STORE, store);

            JSONObject object = new JSONObject();
            //object.accumulate("username", user);
            //object.accumulate("password", password);
            object.accumulate("username", "diaopie");
            object.accumulate("password", "y1<XhkbX");
            request = object.toString();
            StringEntity entity = new StringEntity(request);
            httppost.setEntity(entity);
            httppost.setHeader("Accept", "application/json");
            httppost.setHeader("Content-type", "application/json");


            //HttpPost post1 = new HttpPost("http://192.168.56.1:3000/foodie/login");
            //httpclient.execute(post1);

            httpResponse.getEntity().consumeContent();
            HttpResponse httpResponse2 = httpclient.execute(httppost, ctx);
            inputStream = httpResponse2.getEntity().getContent();

            if(inputStream != null)
                result = ManageInput.InputStreamToString(inputStream);
            else
                result = "Fail";
        }
        catch (Exception e)
        {
            Log.d("InputStream", e.getLocalizedMessage());
        }
        return result;


        /*InputStream inputStream = null;
        String result = "";
        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost("http://192.168.56.1:3000/foodie/login");
        String request = null;

        try
        {
                JSONObject object = new JSONObject();
                object.accumulate("username", user);
                object.accumulate("password", password);
                request = object.toString();
                StringEntity entity = new StringEntity(request);
                httpPost.setEntity(entity);
                httpPost.setHeader("Accept", "application/json");
                httpPost.setHeader("Content-type", "application/json");
                HttpResponse httpResponse = httpclient.execute(httpPost);
                inputStream = httpResponse.getEntity().getContent();


            if(inputStream != null)
                result = ManageInput.InputStreamToString(inputStream);
            else
                result = "Fail";
        }
        catch (Exception e)
        {
            Log.d("InputStream", e.getLocalizedMessage());
        }
        return result;*/
    }

    public class AuthenticationNetworkAsyncTask extends AsyncTask<Void, Void, Void> {

        private final ProgressDialog dialog = new ProgressDialog(MainActivity.this);

        @Override
        protected void onPreExecute() {
            this.dialog.setMessage("Logging ...");
            this.dialog.show();
        }

        @Override
        protected Void doInBackground(final Void... unused) {
            showResult = doAuthentication(Login, Password);
            System.out.println("[RESULTS =====>" + showResult);
            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            if (this.dialog.isShowing()) {
                this.dialog.dismiss();
            }
            /*if (isactive.equals(true))
            {
                Context context = getApplicationContext();
                CharSequence text = "Loggin Successful !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();

                Intent intent = new Intent(MainActivity.this, MainPageActivity.class);
                startActivity(intent);
            }
            else if (showResult.equals("{\"error\":\"Invalid username or password.\"}"))
            {
                Context context = getApplicationContext();
                CharSequence text = "This Username already exist !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }*/


            if (showResult.equals("{\"error\":\"An user is already logged in, please logout.\"}"))
            {
                Context context = getApplicationContext();
                CharSequence text = "ERROR:\"An user is already logged in, please logout.\"";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
            else if (showResult.equals("{\"error\":\"Invalid username or password.\"}"))
            {
                Context context = getApplicationContext();
                CharSequence text = "ERROR:\"Invalid username or password.\"";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
            else
            {
                    Context context = getApplicationContext();
                    CharSequence text = "You are Logged in Successfully !";
                    int duration = Toast.LENGTH_LONG;

                    Toast toast = Toast.makeText(context, text, duration);
                    toast.show();

                    //copy your List of Strings into the Array
                    /*int i = 0;

                    for(Cookie c : cookies )
                    {
                        cookieArray[i] = c.toString();
                        i++;
                    }*/
                    /*Bundle extra = new Bundle();
                    extra.putSerializable("cookieArray", cookieArray);*/
                    Intent intent = new Intent(MainActivity.this, MainPageActivity.class);
                    //intent.putExtra("extra", extra);
                    startActivity(intent);
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LoginEditText = (EditText) findViewById(R.id.LoginEditText);
        PasswordEditText = (EditText) findViewById(R.id.PasswordEditText);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
