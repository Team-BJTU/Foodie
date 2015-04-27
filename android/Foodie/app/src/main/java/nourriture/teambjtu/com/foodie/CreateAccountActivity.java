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
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

import java.io.InputStream;


/*if (showResult != null)
            {
                try
                {
                    JSONObject reader = new JSONObject(showResult);
                    id = reader.getJSONObject(TAG_ID).getString(TAG_ID);
                    username = reader.getJSONObject(TAG_USERNAME).getString(TAG_USERNAME);
                    password = reader.getJSONObject(TAG_PASSWORD).getString(TAG_PASSWORD);
                    email = reader.getJSONObject(TAG_EMAIL).getString(TAG_EMAIL);
                    city = reader.getJSONObject(TAG_CITY).getString(TAG_CITY);
                    birthdate = reader.getJSONObject(TAG_BIRTHDATE).getString(TAG_BIRTHDATE);
                    isadmin = reader.getJSONObject(TAG_ISADMIN).getString(TAG_ISADMIN);
                    v = reader.getJSONObject(TAG_V).getString(TAG_V);
                    dateupdated = reader.getJSONObject(TAG_DATEUPDATED).getString(TAG_DATEUPDATED);
                    datecreated = reader.getJSONObject(TAG_DATECREATED).getString(TAG_DATECREATED);
                    lastlogin = reader.getJSONObject(TAG_LASTLOGIN).getString(TAG_LASTLOGIN);
                    sexe = reader.getJSONObject(TAG_SEXE).getString(TAG_SEXE);
                    isactive = reader.getJSONObject(TAG_ISACTIVE).getString(TAG_ISACTIVE);
                }
                catch (JSONException e)
                {
                    e.printStackTrace();
                }
            }
            else {
                Log.e("ServiceHandler", "Couldn't get any data from the url");
            } */


public class CreateAccountActivity extends ActionBarActivity {

    public EditText UsernameEditText;
    public EditText PasswordEditText;
    public EditText EmailEditText;
    public EditText CityEditText;
    public EditText DateEditText;

    public Spinner GenderSpinner;

    public String username;
    public String password;
    public String email;
    public String city;
    public String date;

    public String GenderSpinnerValue;

    public String showResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_account);

        UsernameEditText = (EditText) findViewById(R.id.UserNameEditText);
        PasswordEditText = (EditText) findViewById(R.id.PasswordEditText);
        EmailEditText = (EditText) findViewById(R.id.EmailEditText);
        CityEditText = (EditText) findViewById(R.id.CityEditText);
        DateEditText = (EditText) findViewById(R.id.DateEditText);
        GenderSpinner = (Spinner) findViewById(R.id.GenderChoiceSpinner);

        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> GenderAdapter = ArrayAdapter.createFromResource(this, R.array.gender_array, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        GenderAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        GenderSpinner.setAdapter(GenderAdapter);
    }

    public void Register (View view)
    {
        username = UsernameEditText.getText().toString();
        password = PasswordEditText.getText().toString();
        email    = EmailEditText.getText().toString();
        city     = CityEditText.getText().toString();
        date     = DateEditText.getText().toString();

        GenderSpinnerValue = GenderSpinner.getSelectedItem().toString();

        if (GenderSpinnerValue == "Male")
        {
            GenderSpinnerValue = "M";
        }
        else if (GenderSpinnerValue == "Female")
        {
            GenderSpinnerValue = "F";
        }
        Log.i("GenderValue", GenderSpinnerValue);

        System.out.println("Affichage Username==== " + username);
        System.out.println("Affichage Password==== " + password);
        System.out.println("Affichage Email==== " + email);
        System.out.println("Affichage City==== " + city);
        System.out.println("Affichage Date==== " + date);
        System.out.println("Affichage Sex==== " + GenderSpinnerValue);

        new RegisterNetworkAsyncTask().execute();
    }

    @SuppressWarnings("deprecation")
    public static String  doRegister(String user, String pass, String email, String city, String date, String sex) {
        InputStream inputStream = null;
        String result = "";
        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost("http://192.168.56.1:3000/foodie/new");
        //HttpPost httpPost = new HttpPost("http://54.65.15.185:3000/foodie/new");
        String request = null;

        try {
            JSONObject object = new JSONObject();
            object.accumulate("username", user);
            object.accumulate("password", pass);
            object.accumulate("mail", email);
            object.accumulate("city", city);
            object.accumulate("birthDate", date);
            object.accumulate("sexe", sex);
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

    public class RegisterNetworkAsyncTask extends AsyncTask<Void, Void, Void> {

        private final ProgressDialog dialog = new ProgressDialog(CreateAccountActivity.this);
        //private final Dialog ResultDialog = new Dialog(CreateAccountActivity.this);

        @Override
        protected void onPreExecute() {
            this.dialog.setMessage("Logging ...");
            this.dialog.show();
        }

        @Override
        protected Void doInBackground(final Void... unused) {

            showResult = doRegister(username, password, email, city, date, GenderSpinnerValue);
            System.out.println("[RESULTS =====>" + showResult);

            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            if (this.dialog.isShowing()) {
                this.dialog.dismiss();
            }
            if (showResult.equals("{\"message\":\"success\"}"))
            {
                Context context = getApplicationContext();
                CharSequence text = "Registration Successful !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();

                Intent intent = new Intent(CreateAccountActivity.this, MainActivity.class);
                startActivity(intent);
            }
            else if (showResult.equals("{\"error\":\"Username already taken\"}"))
            {
                Context context = getApplicationContext();
                CharSequence text = "This Username already exist !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_create_account, menu);
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
