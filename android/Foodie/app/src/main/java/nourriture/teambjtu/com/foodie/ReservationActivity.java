package nourriture.teambjtu.com.foodie;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.DatePicker;

import java.util.Date;

public class ReservationActivity extends ActionBarActivity {

    private String user_id_from_connection;
    private String RestaurantID;
    private DatePicker ReservationDate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation);

        setTitle("Choose a date");

        ReservationDate = (DatePicker) findViewById(R.id.ReservationDatePicker);


        Intent intent = getIntent();
        user_id_from_connection = intent.getStringExtra("user_id_from_connection");
        RestaurantID = intent.getStringExtra("RestaurantID");
        System.out.println("user_id_from_connection In Reservation Activity ====> " + user_id_from_connection);
        System.out.println("RestaurantID In Reservation Activity =====>" + RestaurantID);
    }


    public void ChooseAdate(View view)
    {
        String daytoString = "";
        String monthtoString = "";

        int day     = ReservationDate.getDayOfMonth();
        int month   = ReservationDate.getMonth() + 1;
        int year    = ReservationDate.getYear();


        String RetrieveReservationDate = String.valueOf(day) + String.valueOf(month) + String.valueOf(year);

        System.out.println("DAY =====> " + day);
        System.out.println("MONTH =====> " + month);
        System.out.println("YEAR =====> " + year);

        System.out.println("RetrieveReservationDate ====> " + RetrieveReservationDate);

        if (day < 10)
            daytoString = "0" + String.valueOf(day);
        else
            daytoString = String.valueOf(day);
        if (month < 10)
            monthtoString = "0" + String.valueOf(month);
        else
            monthtoString = String.valueOf(month);

        RetrieveReservationDate = daytoString + monthtoString + String.valueOf(year);

        System.out.println("RetrieveReservationDate FORMAT ====> " + RetrieveReservationDate);

        Intent intent = new Intent(ReservationActivity.this, ChooseHour.class);
        intent.putExtra("user_id_from_connection", user_id_from_connection);
        intent.putExtra("RestaurantID", RestaurantID);
        intent.putExtra("ReservationDate", RetrieveReservationDate);
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_reservation, menu);
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
