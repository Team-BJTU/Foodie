package nourriture.teambjtu.com.foodie;

import android.app.FragmentManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.widget.Toast;
import android.util.Log;
import android.app.Activity;
import android.location.LocationManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;


import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.places.Places;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;



import com.google.android.gms.maps.*;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import android.os.AsyncTask;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.util.Log;
import java.io.UnsupportedEncodingException;

/**
 * Created by diaopie on 31/03/15 at 14:21.
 */

public  class Discover_Activity extends Activity
        // implements GoogleApiClient.ConnectionCallbacks,
        //          GoogleApiClient.OnConnectionFailedListener
{

    /** Local variables **/

    GoogleMap googleMap;

    private float userIcon, foodIcon, drinkIcon, shopIcon, otherIcon;


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
                    addUserMarker(location);
                    System.out.println("AJOUT DU MARQUEUR");

                }

                LocationListener locationListener = new LocationListener() {
                    public void onLocationChanged(Location location) {
                        // redraw the marker when get location update.
                        System.out.println("AJOUT DU MARQUEUR SI CA BOUGE");
                        addUserMarker(location);
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

    /*    mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(Places.GEO_DATA_API)
                .addApi(Places.PLACE_DETECTION_API)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .build();*/
    }


    /**
     * Adds a marker to the map
     */
    private void addUserMarker(Location location){

        /** Make sure that the map has been initialised **/
        userIcon = BitmapDescriptorFactory.HUE_AZURE;
        foodIcon = BitmapDescriptorFactory.HUE_ORANGE;
        drinkIcon = BitmapDescriptorFactory.HUE_ROSE;
        shopIcon = BitmapDescriptorFactory.HUE_YELLOW;
        otherIcon = BitmapDescriptorFactory.HUE_VIOLET;

        if(null != googleMap){
            googleMap.clear();
            LatLng currentPosition = new LatLng(location.getLatitude(),location.getLongitude());
            googleMap.addMarker(new MarkerOptions()
                            .position(currentPosition)
                            .snippet("Lat:" + location.getLatitude() + "Lng:"+ location.getLongitude())
                            .icon(BitmapDescriptorFactory.defaultMarker(userIcon))
                            .title("User")
            );

            String latVal = String.valueOf(location.getLatitude());
            String longVal = String.valueOf(location.getLongitude());

            try
            {
                String placesSearchStr = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                        + URLEncoder.encode(latVal, "UTF8")
                        +","
                        + URLEncoder.encode(longVal, "UTF8")
                        +"&radius="
                        +URLEncoder.encode("1000", "UTF8")
                        +"&sensor="
                        +URLEncoder.encode("true", "UTF8")
                        +"&types="
                        +URLEncoder.encode("food|bar|store|museum|art_gallery", "UTF8")
                        +"&key="
                        + URLEncoder.encode("AIzaSyCXAGJx8zNb5kEVXcKjJwrjGsCtpYSRskY", "UTF8");
                new GetPlaces().execute(placesSearchStr);
            }
            catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.discover_layout);
        createMapView();
    }


    private class GetPlaces extends AsyncTask<String, Void, String> {

        private Marker[] placeMarkers;
        private final int MAX_PLACES = 20;
        private MarkerOptions[] places;

        @Override
        protected String doInBackground(String... placesURL) {
            //fetch places
            StringBuilder placesBuilder = new StringBuilder();

            //process search parameter string(s)
            for (String placeSearchURL : placesURL) {
                //execute search
                HttpClient placesClient = new DefaultHttpClient();
                try {
                    //try to fetch the data
                    HttpGet placesGet = new HttpGet(placeSearchURL);
                    HttpResponse placesResponse = placesClient.execute(placesGet);
                    StatusLine placeSearchStatus = placesResponse.getStatusLine();
                    if (placeSearchStatus.getStatusCode() == 200) {
                        //we have an OK response
                        HttpEntity placesEntity = placesResponse.getEntity();
                        InputStream placesContent = placesEntity.getContent();
                        InputStreamReader placesInput = new InputStreamReader(placesContent);
                        BufferedReader placesReader = new BufferedReader(placesInput);
                        String lineIn;
                        while ((lineIn = placesReader.readLine()) != null) {
                            placesBuilder.append(lineIn);
                            System.out.println("AFFICHAGE 1" + lineIn);
                        }
                    }
                }
                catch(Exception e){
                    e.printStackTrace();
                }

            }

            return placesBuilder.toString();
        }

        protected void onPostExecute(String result) {
            //parse place data returned from Google Places


            placeMarkers = new Marker[MAX_PLACES];
            if(placeMarkers!=null){
                System.out.println("test 1");
                for(int pm=0; pm<placeMarkers.length; pm++){
                    if(placeMarkers[pm]!=null)
                        placeMarkers[pm].remove();
                }
            }

            try {
                //parse JSON
                JSONObject resultObject = new JSONObject(result);
                JSONArray placesArray = resultObject.getJSONArray("results");
                places = new MarkerOptions[placesArray.length()];
                for (int p=0; p<placesArray.length(); p++) {
                    //parse each place
                    boolean missingValue=false;
                    LatLng placeLL=null;
                    String placeName="";
                    String vicinity="";
                    float currIcon = otherIcon;

                    try{
                        //attempt to retrieve place data values
                        missingValue=false;
                        JSONObject placeObject = placesArray.getJSONObject(p);
                        JSONObject loc = placeObject.getJSONObject("geometry").getJSONObject("location");
                        placeLL = new LatLng(
                                Double.valueOf(loc.getString("lat")),
                                Double.valueOf(loc.getString("lng")));
                        JSONArray types = placeObject.getJSONArray("types");

                        for(int t=0; t<types.length(); t++){
                            //what type is it
                            String thisType=types.get(t).toString();
                            if(thisType.contains("food")){
                                currIcon = foodIcon;
                                break;
                            }
                            else if(thisType.contains("bar")){
                                currIcon = drinkIcon;
                                break;
                            }
                            else if(thisType.contains("store")){
                                currIcon = shopIcon;
                                break;
                            }
                        }
                        vicinity = placeObject.getString("vicinity");
                        placeName = placeObject.getString("name");
                    }
                    catch(JSONException jse){
                        missingValue=true;
                        jse.printStackTrace();
                    }
                    if(missingValue)
                        places[p]=null;
                    else
                        places[p]=new MarkerOptions()
                                .position(placeLL)
                                .title(placeName)
                                .icon(BitmapDescriptorFactory.defaultMarker(currIcon))
                                .snippet(vicinity);
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }

            if(places!=null && placeMarkers!=null){
                for(int p=0; p<places.length && p<placeMarkers.length; p++){
                    //will be null if a value was missing
                    if(places[p]!=null)
                        placeMarkers[p]=googleMap.addMarker(places[p]);
                }
            }
        }

    }


}