package nourriture.teambjtu.com.foodie;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.style.UnderlineSpan;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.util.ArrayList;

/**
 * Created by diaopie on 19/04/15 at 01:53.
 */
public class Reservation_Activity extends Activity
{
    private TextView ReservationTextView;
    private ListView RestaurantListView;

    JSONArray restaurants = null;

    ArrayList<String> RestaurantNameList = new ArrayList<String>();
    ArrayList<String> AddressList = new ArrayList<String>();
    ArrayList<String> ZipCodeList = new ArrayList<String>();
    ArrayList<String> CityList = new ArrayList<String>();
    ArrayList<String> CountryList = new ArrayList<String>();
    ArrayList<String> PhoneList = new ArrayList<String>();
    ArrayList<String> MailList = new ArrayList<String>();
    ArrayList<String> RestaurantIdList = new ArrayList<String>();

    private static final String TAG_RESTAURANTS = "restaurants";
    private static final String TAG_ID = "_id";
    private static final String TAG_NAME = "name";
    private static final String TAG_EMAIL = "mail";
    private static final String TAG_PHONE = "phone";
    private static final String TAG_ADRESS = "adress";
    private static final String TAG_CITY = "city";
    private static final String TAG_ZIPCODE = "zipcode";
    private static final String TAG_COUNTRY = "country";
    private static final String TAG_USER_ID = "user_id";
    private static final String TAG_V = "__v";
    private static final String TAG_DATEUPDATED = "date_updated";
    private static final String TAG_DATECREATED = "date_created";

    public String showResult;
    public String user_id_from_connection;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.reservation_layout);

        ReservationTextView = (TextView) findViewById(R.id.ReservationTextView);
        RestaurantListView = (ListView) findViewById(R.id.RestaurantListView);

        SpannableString content = new SpannableString("Reservation :");
        content.setSpan(new UnderlineSpan(), 0, content.length(), 0);
        ReservationTextView.setText(content);

        Intent intentConnection = getIntent();
        user_id_from_connection = intentConnection.getStringExtra("user_id_from_connection");
        System.out.println("user_id_from_connection IN RES_ACT Before Click =====> " + user_id_from_connection);


        new GetAllRestaurantAsyncTask().execute();

        //Set Item on ListView Clickable
        RestaurantListView.setClickable(true);
        //Action when we click the list view items
        RestaurantListView.setOnItemClickListener(new AdapterView.OnItemClickListener()
        {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id)
            {

                //Retreive information with the position of items on the list
                String RestaurantID             = RestaurantIdList.get(position);
                String RestaurantTitleFromList  = (RestaurantListView.getItemAtPosition(position).toString());
                String RestaurantAddress        = AddressList.get(position);
                String RestaurantZipCode        = ZipCodeList.get(position);
                String RestaurantCity           = CityList.get(position);
                String RestaurantCountry        = CountryList.get(position);
                String RestaurantPhone          = PhoneList.get(position);
                String RestaurantEmail          = MailList.get(position);

                //Create a new activity
                Bundle extra = new Bundle();
                extra.putSerializable("RestaurantTitleFormList", RestaurantTitleFromList);
                Intent intent = new Intent(Reservation_Activity.this, RestaurantDescriptionActivity.class);

                //Send Information to the new activity
                intent.putExtra("RestaurantID", RestaurantID);
                intent.putExtra("extra", extra);
                intent.putExtra("RestaurantAddress", RestaurantAddress);
                intent.putExtra("RestaurantZipCode", RestaurantZipCode);
                intent.putExtra("RestaurantCity", RestaurantCity);
                intent.putExtra("RestaurantCountry", RestaurantCountry);
                intent.putExtra("RestaurantPhone", RestaurantPhone);
                intent.putExtra("RestaurantEmail", RestaurantEmail);
                intent.putExtra("user_id_from_connection", user_id_from_connection);
                System.out.println("user_id_from_connection IN RES_ACT On Click =====> " + user_id_from_connection);

                //Start the RestaurantDescriptionActiviy
                startActivity(intent);
            }
        });
    }

    public static String doGetAllRestaurant()
    {
        String result = "";
        InputStream inputStream = null;
        HttpClient httpclient = new DefaultHttpClient();
        HttpGet httpGet = new HttpGet("http://192.168.56.1:3000/restaurants/all");
        //HttpGet httpGet = new HttpGet("http://54.65.15.185:3000/restaurants/all");

        try {
            JSONObject object = new JSONObject();
            httpGet.setHeader("Accept", "application/json");
            httpGet.setHeader("Content-type", "application/json");
            HttpResponse httpResponse = httpclient.execute(httpGet);
            inputStream = httpResponse.getEntity().getContent();
            if (inputStream != null)
                result = ManageInput.InputStreamToString(inputStream);
            else
                result = "Fail";
        } catch (Exception e) {
            Log.d("InputStream", e.getLocalizedMessage());
        }
        return result;
    }

    public class GetAllRestaurantAsyncTask extends AsyncTask<Void, Void, Void>
    {
        private final ProgressDialog dialog = new ProgressDialog(Reservation_Activity.this);

        @Override
        protected void onPreExecute()
        {
            this.dialog.setMessage("Loading ...");
            this.dialog.show();
        }

        @Override
        protected Void doInBackground(final Void... unused)
        {
            showResult = doGetAllRestaurant();
            System.out.println("[RESULTS =====> " + showResult);

            if (showResult != null)
            {
                try
                {
                    JSONObject jsonObj = new JSONObject(showResult);

                    // Getting JSON Array node
                    restaurants = jsonObj.getJSONArray(TAG_RESTAURANTS);
                    for (int i = 0; i < restaurants.length(); i++)
                    {
                        JSONObject c = restaurants.getJSONObject(i);

                        String id           = c.getString(TAG_ID);
                        String name         = c.getString(TAG_NAME);
                        String email        = c.getString(TAG_EMAIL);
                        String phone        = c.getString(TAG_PHONE);
                        String adress       = c.getString(TAG_ADRESS);
                        String city         = c.getString(TAG_CITY);
                        String zipcode      = c.getString(TAG_ZIPCODE);
                        String country      = c.getString(TAG_COUNTRY);
                        String user_id      = c.getString(TAG_USER_ID);
                        String v            = c.getString(TAG_V);
                        String date_updated = c.getString(TAG_DATEUPDATED);
                        String date_created = c.getString(TAG_DATECREATED);

                        RestaurantIdList.add(id);
                        RestaurantNameList.add(name);
                        AddressList.add(adress);
                        ZipCodeList.add(zipcode);
                        CityList.add(city);
                        CountryList.add(country);
                        PhoneList.add(phone);
                        MailList.add(email);
                    }
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
            System.out.println("RestaurantNameList =====> " + RestaurantNameList);

            ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(Reservation_Activity.this,
                    android.R.layout.simple_list_item_1, RestaurantNameList);
            RestaurantListView.setAdapter(arrayAdapter);
        }
    }
}
