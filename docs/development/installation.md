---
nav_order: 1
title: Install and Run
parent: Development
---

# Install and Run

## Prerequisites

Since this project is using React Native, an essential requirement is [Node](https://nodejs.org/en/download/).

On Linux follow the instructions [here](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions).

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

## Running the Application

1. To run the application you can navigate to the `app` directory and execute `npm start`:
    ```sh
    cd app
    npm start
    ```
1. This spins up a server through Expo CLI. Install the `Expo Go` application on your device (supported on both iOS and Android) and scan the provided QR code, which will run the app on your phone
