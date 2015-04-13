package nourriture.teambjtu.com.foodie;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.Toast;
import android.util.Log;
import android.app.Activity;
import android.location.LocationManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;

import 	com.google.android.gms.maps.model.BitmapDescriptorFactory;


import com.google.android.gms.maps.*;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

/**
 * Created by diaopie on 31/03/15 at 14:21.
 */

public class Discover_fragment extends Activity {

    /** Local variables **/

    GoogleMap googleMap;
    @Nullable

    /**
     * Initialises the mapview
     */
    private void createMapView(){
        /**
         * Catch the null pointer exception that
         * may be thrown when initialising the map
         */
        try {
            if(null == googleMap){
                googleMap = ((MapFragment) getFragmentManager().findFragmentById(R.id.mapView)).getMap();

                googleMap.setMyLocationEnabled(true);

                final LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

                Criteria criteria = new Criteria();

                // Getting the name of the best provider
                final String provider = locationManager.getBestProvider(criteria, true);

                // Getting Current Location
                final Location location = locationManager.getLastKnownLocation(provider);

                if (location != null) {
                    //PLACE THE INITIAL MARKER
                    addMarker(location);
                }

                LocationListener locationListener = new LocationListener() {
                    public void onLocationChanged(Location location) {
                        // redraw the marker when get location update.
                        addMarker(location);
                    }
                    public void onStatusChanged(String provider, int status, Bundle extras) {}

                    public void onProviderEnabled(String provider) {}

                    public void onProviderDisabled(String provider) {}
                };

                locationManager.requestLocationUpdates(provider, 20000, 0, locationListener);
                /**
                 * If the map is still null after attempted initialisation,
                 * show an error to the user
                 */
                if(null == googleMap) {
                    Toast.makeText(getApplicationContext(),
                            "Error creating map",Toast.LENGTH_SHORT).show();
                }
            }
        } catch (NullPointerException exception){
            Log.e("mapApp", exception.toString());
        }
    }


    /**
     * Adds a marker to the map
     */
    private void addMarker(Location location){

        /** Make sure that the map has been initialised **/
        if(null != googleMap){
            googleMap.clear();
            LatLng currentPosition = new LatLng(location.getLatitude(),location.getLongitude());
            googleMap.addMarker(new MarkerOptions()
                            .position(currentPosition)
                            .snippet("Lat:" + location.getLatitude() + "Lng:"+ location.getLongitude())
                            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
                            .title("User")
            );
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.discover_layout);
        createMapView();
    }
}