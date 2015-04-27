package nourriture.teambjtu.com.foodie;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;


public class ChooseHour extends ActionBarActivity {

    private static final String TAG_MESSAGE = "message";
    private static final String TAG_RESERVATION = "reservation";
    //private static final String TAG_V = "__v";
    private static final String TAG_RESTAURANTID = "restaurant_id";
    private static final String TAG_USERID = "user_id";
    private static final String TAG_DATE = "date";
    private static final String TAG_ID = "_id";
    //private static final String TAG_DATEUPDATED = "date_updated";
    //private static final String TAG_DATECREATED = "date_created";

    String message;

    public static String user_id_from_connection;
    public static String RestaurantID;
    public static String ReservationDate;

    public String showResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose_hour);

        Intent intent = getIntent();
        user_id_from_connection = intent.getStringExtra("user_id_from_connection");
        RestaurantID = intent.getStringExtra("RestaurantID");
        ReservationDate = intent.getStringExtra("ReservationDate");

        System.out.println("user_id_from_connection In Choose Hour Activity ====> " + user_id_from_connection);
        System.out.println("RestaurantID In Choose Hour Activity =====>" + RestaurantID);
        System.out.println("ReservationDate In Choose Hour Activity =====>" + ReservationDate);
    }

    public void ConfirmReservation(View view)
    {
        new NewReservationAsyncTask().execute();
    }

    @SuppressWarnings("deprecation")
    public static String doNewReservation()
    {
        InputStream inputStream = null;
        String result = "";
        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost("http://192.168.56.1:3000/reservations/new");
        //HttpPost httpPost = new HttpPost("http://54.65.15.185:3000/reservations/new");
        String request = null;

        try {
            JSONObject object = new JSONObject();
            object.accumulate("restaurant_id", RestaurantID);
            object.accumulate("user_id", user_id_from_connection);
            object.accumulate("date", ReservationDate);
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


    public class NewReservationAsyncTask extends AsyncTask<Void,Void,Void>
    {
        private final ProgressDialog dialog = new ProgressDialog(ChooseHour.this);

        @Override
        protected void onPreExecute()
        {
            this.dialog.setMessage("Reservation in Progress ...");
            this.dialog.show();
        }

        @Override
        protected Void doInBackground(final Void... unused)
        {
            showResult = doNewReservation();
            System.out.println("[RESULTS =====> " + showResult);

            /*
            {
                "message": "success",
                    "reservation": {
                        "__v": 0,
                        "restaurant_id": "5533b21b5c3f863642fa9eb3",
                        "user_id": "5518cdafcd61e17911624028",
                        "date": "1970-01-01T03:20:52.015Z",
                        "_id": "553c94a18ae1dd3c209f739f",
                        "date_updated": "2015-04-26T07:32:49.196Z",
                        "date_created": "2015-04-26T07:32:49.196Z"
                }
            }
            */

            if (showResult != null)
            {
                try
                {
                    JSONObject reader        = new JSONObject(showResult);

                    message           = reader.getString(TAG_MESSAGE);

                    JSONObject reservation   = reader.getJSONObject(TAG_RESERVATION);

                    String restaurant_id     = reservation.getString(TAG_RESTAURANTID);
                    String user_id           = reservation.getString(TAG_USERID);
                    String date              = reservation.getString(TAG_DATE);
                    String reservation_id    = reservation.getString(TAG_ID);

                    System.out.println("MESSAGE ====> " + message);
                    System.out.println("RESTAURANT_ID =====> " + restaurant_id);
                    System.out.println("USER_ID =====> " + user_id);
                    System.out.println("DATE =====> " + date);
                    System.out.println("RESERVATION_ID =====> " + reservation_id);
                }
                catch (JSONException e)
                {
                    e.printStackTrace();
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            if (this.dialog.isShowing()) {
                this.dialog.dismiss();
            }
            if (message.equals("success"))
            {
                Context context = getApplicationContext();
                CharSequence text = "Reservation Successful !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();

                Intent intent = new Intent(ChooseHour.this, MyTabActivity.class);
                startActivity(intent);
            }
            else
            {
                Context context = getApplicationContext();
                CharSequence text = "ERROR: There is something wrong !";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_choose_hour, menu);
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
