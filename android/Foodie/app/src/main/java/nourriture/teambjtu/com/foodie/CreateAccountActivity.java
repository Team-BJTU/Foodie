package nourriture.teambjtu.com.foodie;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;


public class CreateAccountActivity extends ActionBarActivity {

    public EditText UsernameEditText;
    public EditText PasswordEditText;
    public EditText EmailEditText;
    public EditText CityEditText;
    public EditText DateEditText;

    public Spinner GenderSpinner;

    public void Register (View view)
    {
        String Username = UsernameEditText.getText().toString();
        String Password = PasswordEditText.getText().toString();
        String Email    = EmailEditText.getText().toString();
        String City     = CityEditText.getText().toString();
        String Date     = DateEditText.getText().toString();

        String GenderSpinnerValue = GenderSpinner.getSelectedItem().toString();
        Log.i("GenderValue", GenderSpinnerValue);
    }

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


        //Clear UsernameEditText OnClick
        UsernameEditText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
        UsernameEditText.setText("");
            }
        });

        //Clear PasswordEditText OnClick
        PasswordEditText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {PasswordEditText.setText("");
            }
        });

        //Clear EmailEditText OnClick
        EmailEditText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EmailEditText.setText("");
            }
        });

        //Clear CityEditText OnClick
        CityEditText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CityEditText.setText("");
            }
        });

        //Clear DateEditText OnClick
        DateEditText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DateEditText.setText("");
            }
        });

        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> GenderAdapter = ArrayAdapter.createFromResource(this, R.array.gender_array, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        GenderAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        GenderSpinner.setAdapter(GenderAdapter);
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
