package nourriture.teambjtu.com.foodie;

import android.app.TabActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TabHost;

/**
 * Created by diaopie on 19/04/15 at 01:48.
 */

public class MyTabActivity extends TabActivity
{

    public String CookieStringLogOut;
    public String user_id_from_connection;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tabhost_layout);

        // create the TabHost that will contain the Tabs
        TabHost tabHost = (TabHost)findViewById(android.R.id.tabhost);


        TabHost.TabSpec tab1 = tabHost.newTabSpec("First Tab");
        TabHost.TabSpec tab2 = tabHost.newTabSpec("Second Tab");
        TabHost.TabSpec tab3 = tabHost.newTabSpec("Third tab");

        // Set the Tab name and Activity
        // that will be opened when particular Tab will be selected
        Intent intent = getIntent();
        CookieStringLogOut = intent.getStringExtra("CookieString");
        user_id_from_connection = intent.getStringExtra("user_id_from_connection");
        System.out.println("COOKIE_IN_TAB =====> " + CookieStringLogOut);
        System.out.println("user_id_from_connection IN TAB ====> " + user_id_from_connection);

        tab1.setIndicator("Home");
        Intent intentHome = new Intent(this, Home_Activity.class);
        intentHome.putExtra("CookieStringLogOut", CookieStringLogOut);
        intentHome.putExtra("user_id_from_connection", user_id_from_connection);
        tab1.setContent(intentHome);

        tab2.setIndicator("Reservation");
        Intent intentReservation = new Intent(this, Reservation_Activity.class);
        intentReservation.putExtra("user_id_from_connection", user_id_from_connection);
        tab2.setContent(intentReservation);

        tab3.setIndicator("Discover");
        Intent intentDiscover = new Intent(this, Discover_Activity.class);
        tab3.setContent(intentDiscover);

        /** Add the tabs  to the TabHost to display. */
        tabHost.addTab(tab1);
        tabHost.addTab(tab2);
        tabHost.addTab(tab3);
    }
}
