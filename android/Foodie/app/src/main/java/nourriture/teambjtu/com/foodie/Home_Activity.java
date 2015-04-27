package nourriture.teambjtu.com.foodie;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.InputStream;

/**
 * Created by diaopie on 19/04/15 at 01:50.
 */
public class Home_Activity extends Activity
{
    public Button LogOutButton;

    public String showResult;
    public String CookieStringLogOut;


    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.hometab_layout);

        LogOutButton = (Button) findViewById(R.id.LogOutButton);

        Intent intent = getIntent();
        System.out.println("INTENT_VALUE =====> " + intent.getStringExtra("CookieStringLogOut"));
        CookieStringLogOut = intent.getStringExtra("CookieStringLogOut");
        System.out.println("COOKIE =====> " + CookieStringLogOut);
    }

    public void LogOut(View  view)
    {
        new LogOutNetworkAsyncTask().execute();
    }

    public String doLogout()
    {
        HttpClient Client = new DefaultHttpClient();
        InputStream inputStream = null;
        String result = "";

        try
        {
            HttpGet httpget = new HttpGet("http://192.168.56.1:3000/foodie/logout");
            //HttpGet httpget = new HttpGet("http://54.65.15.185:3000/foodie/logout");

            httpget.setHeader("Cookie", CookieStringLogOut);
            HttpResponse httpResponse = Client.execute(httpget);
            inputStream = httpResponse.getEntity().getContent();
            if(inputStream != null)
                result = ManageInput.InputStreamToString(inputStream);
            else
                result = "Fail";
        }
        catch(Exception e)
        {
            Log.d("InputStream", e.getLocalizedMessage());
        }
        return result;
    }

    public class LogOutNetworkAsyncTask extends AsyncTask<Void,Void,Void>
    {
        private final ProgressDialog dialog = new ProgressDialog(Home_Activity.this);

        @Override
        protected void onPreExecute() {
            this.dialog.setMessage("Log out ...");
            this.dialog.show();
        }

        @Override
        protected Void doInBackground(final Void... unused) {

            showResult = doLogout();
            System.out.println("[RESULTS =====>" + showResult);
            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            if (this.dialog.isShowing()) {
                this.dialog.dismiss();
            }
            if (showResult.equals("{\"message\":\"You are not logged out.\"}"))
            {
                Context context = getApplicationContext();
                CharSequence text = "You are Logged out !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();

                Intent intent = new Intent(Home_Activity.this, MainActivity.class);
                startActivity(intent);
            }
        }
    }
}
