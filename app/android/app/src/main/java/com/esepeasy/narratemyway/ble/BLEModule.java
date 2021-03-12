package com.esepeasy.narratemyway.ble;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.bridge.ReactMethod;

public class BLEModule extends ReactContextBaseJavaModule{
    /**
     * Member Variables
     */

    private final ReactApplicationContext reactContext;

    /**
     * Constructor
     *
     * @param reactContext ReactApplicationContext
     */

    public BLEModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

    }

    @Override
    public String getName() {
        return "BLE_Android";
    }

    @ReactMethod
    public void hasBLE(Callback successCallback, Callback errorCallback) {
        // Check for whether the device has a flash or not
        if (reactContext.getApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
            successCallback.invoke();
        }

        else {
            errorCallback.invoke();
        }

    }
}
