package nourriture.teambjtu.com.foodie;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;


public class RestaurantDescriptionActivity extends ActionBarActivity {

    private String RestaurantID;
    private String user_id_from_connection;

    //private Button ReservationButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_restaurant_description);

        TextView restaurantTitleTextView = (TextView) findViewById(R.id.RestaurantTitleTextView);
        TextView addressTexTView = (TextView) findViewById(R.id.AddressTextView);
        TextView zipCodeTextView = (TextView) findViewById(R.id.ZipCodeTextView);
        TextView cityTextView = (TextView) findViewById(R.id.CityTextView);
        TextView countryTextView = (TextView) findViewById(R.id.CountryTextView);
        TextView phoneTextView = (TextView) findViewById(R.id.PhoneTextView);
        TextView emailTextView = (TextView) findViewById(R.id.EmailTextView);
        //ReservationButton = (Button) findViewById(R.id.ReservationButton);

        Intent intent = getIntent();
        Bundle extra = getIntent().getBundleExtra("extra");

        RestaurantID = intent.getStringExtra("RestaurantID");
        user_id_from_connection = intent.getStringExtra("user_id_from_connection");

        String RestaurantTitleFromL = (String) extra.getSerializable("RestaurantTitleFormList");
        String Address = "Adresse : " + intent.getStringExtra("RestaurantAddress");
        String ZipCode = "Zip Code : " + intent.getStringExtra("RestaurantZipCode");
        String City = "City : " + intent.getStringExtra("RestaurantCity");
        String Country = "Country : " + intent.getStringExtra("RestaurantCountry");
        String Phone = "Phone : " + intent.getStringExtra("RestaurantPhone");
        String Email = "Email : " + intent.getStringExtra("RestaurantEmail");

        addressTexTView.setText(Address);
        zipCodeTextView.setText(ZipCode);
        cityTextView.setText(City);
        countryTextView.setText(Country);
        phoneTextView.setText(Phone);
        emailTextView.setText(Email);

        restaurantTitleTextView.setText(RestaurantTitleFromL);

        System.out.println("Restaurant_id ====> " + RestaurantID);
        System.out.println("Name ====> " + RestaurantTitleFromL);
        System.out.println("Address ====> " + Address);
        System.out.println("Zip Code ====> " + ZipCode);
        System.out.println("City ====> " + City);
        System.out.println("Country ====> " + Country);
        System.out.println("Phone ====> " + Phone);
        System.out.println("Email ====> " + Email);

    }

    public void ReservationView(View view)
    {
        Intent intent = new Intent(RestaurantDescriptionActivity.this, ReservationActivity.class);

        intent.putExtra("user_id_from_connection", user_id_from_connection);
        intent.putExtra("RestaurantID", RestaurantID);
        System.out.println("user_id_from_connection =====> " + user_id_from_connection);
        startActivity(intent);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_restaurant_description, menu);
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
