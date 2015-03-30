package com.jit.justintime.foodietest;

import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

import java.io.InputStream;


public class AuthenticationActivity extends ActionBarActivity {
      String username;
      String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        Button login = (Button) findViewById(R.id.loginBtn);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText usernameInput = (EditText) findViewById(R.id.userName);
                username = usernameInput.getText().toString();
                EditText passwordInput = (EditText) findViewById(R.id.password);
                password = passwordInput.getText().toString();
                System.out.println("Affichage username==== " + username);
                System.out.println("Affichage password==== " + password);

                new AuthenticationTask().execute();
            }
        });
    }

    @SuppressWarnings("deprecation")
    private static String  doAuthentication(String user, String pass) {
        InputStream inputStream = null;
        String result = "";
        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost("http://192.168.56.1:3000/foodie/login");
        String request = null;

        try {
            JSONObject object = new JSONObject();
            object.accumulate("username", user);
            object.accumulate("password", pass);
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
        } catch (Exception e) {
            Log.d("InputStream", e.getLocalizedMessage());
        }
        return result;
    }

    private class AuthenticationTask extends AsyncTask<Void, Void, Void> {

        private final ProgressDialog dialog = new ProgressDialog(
                AuthenticationActivity.this);

        protected void onPreExecute() {
                this.dialog.setMessage("Logging ...");
                this.dialog.show();
        }

        protected Void doInBackground(final Void... unused) {
            String showResult = doAuthentication(username, password);
            System.out.println("[Mon putain de resultat =====> "  + showResult);

            return null;
        }

        protected void onPostExecute(Void result) {
            if (this.dialog.isShowing()) {
                this.dialog.dismiss();
            }
        }
    }
}
