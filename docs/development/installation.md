---
nav_order: 1
title: Install and Run
parent: Development
---

# Install and Run

## Prerequisites

Since this project is using React Native, an essential requirement is [Node](https://nodejs.org/en/download/). On Linux follow the instructions [here](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions) to install Node.

Assuming you have this installed, you need to first install the Expo CLI command line utility:

```sh
npm install -g expo-cli
```

Follow the instructions [here](https://reactnative.dev/docs/environment-setup) for more information and troubleshooting.

## Installation

1. Fork the repo
1. Clone the repo:
   ```sh
   git clone https://github.com/ESE-Peasy/NarrateMyWay.git
   ```
1. Install NPM dependencies for the project:
   ```sh
   cd app
   npm install
   ```
1. Install various dependencies for your OS system and android/Iosrun  [here](https://reactnative.dev/docs/environment-setup)

### Linux android setup
Steps take from [here](https://reactnative.dev/docs/environment-setup)
Installed Android studio via snap:
```sh
sudo snap install android-studio --classic
```

To get the correct Java version:
```sh
sudo apt install default-jdk
```

## Running the Application

1. To run the application you can navigate to the `app` directory and execute `npm start`:
    ```sh
    cd app
    npx react-native start
    ```

### Running on Android 
1. Start an emulator via Android studio or connect your Android phone to your computer via USB.
Ensure developer mode and usb debugging is turned on. Follow [here](https://developer.android.com/studio/debug/dev-options) for more instructions

1. Check the relvant USB device is accessible
   ```sh
   adb devices
   ```
1. Build the android app
   ```sh
   npm run android
   ```

### Running on iOS 
 1. To run on an emulator
```sh 
npx react-native run-ios --simulator="iphone 11" 
```
(change name to match intended iPhone model)

1. To run on an iPhone, follow instructions [here](https://reactnative.dev/docs/running-on-device)




