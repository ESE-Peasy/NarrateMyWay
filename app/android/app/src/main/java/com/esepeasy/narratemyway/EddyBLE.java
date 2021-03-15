package com.esepeasy.narratemyway;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import org.altbeacon.beacon.*;

public class EddyBLE extends ReactContextBaseJavaModule  {
    private static Boolean isOn = false;
    public EddyBeaconScanner scanner;
    public EddyBLE(ReactApplicationContext reactContext) {
        super(reactContext);
        Looper.prepare();
        this.scanner = new EddyBeaconScanner();
    }

    @ReactMethod
    public void getStatus(
            Callback successCallback) {
        successCallback.invoke(null, isOn);

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
        stringCallback.invoke(this.scanner.beacon);
    }

    @Override
    @ReactMethod
    public String getName() {
        return "EddyBLE";
    }

}
