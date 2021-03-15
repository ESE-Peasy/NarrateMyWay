package com.esepeasy.narratemyway;

import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class EddyBLE extends ReactContextBaseJavaModule  {
    private static Boolean isOn = false;
    public String test = "Testing Bulb";
    public EddyBLE(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getStatus(
            Callback successCallback) {
        successCallback.invoke(null, test);

    }

    @ReactMethod
    public void turnOn() {
        isOn = true;
    }
    @ReactMethod
    public void turnOff() {
        isOn = false;
    }

    @ReactMethod
    public void getString(Callback stringCallback) {
        stringCallback.invoke("Working Bridge we can use for EddyStone URLs");
    }

    @Override
    @ReactMethod
    public String getName() {
        return "EddyBLE";
    }

}
