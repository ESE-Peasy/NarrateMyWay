package com.esepeasy.narratemyway;

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
        successCallback.invoke(null, isOn);

    }

    @ReactMethod
    public String turnOn() {
        isOn = true;
        return "Bulb is turn ON";
    }
    @ReactMethod
    public String turnOff() {
        isOn = false;
        return "Bulb is turn OFF";
    }

    @Override
    @ReactMethod
    public String getName() {
        return "EddyBLE";
    }

}
