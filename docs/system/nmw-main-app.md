---
nav_order: 2
title: NarrateMyWay
parent: System Overview
---

# NarrateMyWay - Main Application

The NarrateMyWay application is the main application of the system. The application is intended to run passively on Android and iOS mobile devices, providing audio feedback regarding points of interest which the user passes by. In this way, a user is able to launch the application before placing their device in their pocket, and assuming the use of earphones, announcements will be made to the user as they pass Bluetooth beacons which have been configured for use with the NarrateMyWay system.

The way in which this application works is outlined below:

<embed src="../images/NMW-Main.pdf" type="application/pdf" width="100%" height="600px" />

## Types of Beacon

There are two types of beacon which are configured for use with the NarrateMyWay system:

### 1. Location Beacons

A "Location Beacon" is the typical beacon that is detected by the application. These are beacons which are setup using our provided [Setup](./nmw-setup-app) application, whose encoding has been generated to provide information regarding the location at which that beacon is placed.

At a minimum, these beacons will provide users with the following information:

<h4 id="table-1" align="center" class="fs-4 fw-50">
    <u>Table 1: Information provided via the NMW Standard</u>
</h4>

| Location attribute | Description                                              | Example(s)                             |
| ------------------ | -------------------------------------------------------- | -------------------------------------- |
| Location Type      | The type of location this beacon holds information about | _Point of Interest, Obstacle, Warning_ |
| Location Name      | The name of the location per the [NMW Standard](TBC)     | _Cafe, Lecture Hall, Library_          |
| Audio Description  | A short audio snippet to be played to users              | _"There is a cafe near you"_           |
| Icon               | A small icon to signify the location                     | N/A                                    |

In this way, we ensure that any beacon setup to use the NarrateMyWay standard provides users with useful general information regarding the location they are at.

However, with the setup application, it is also possible for the beacon to provide more enriched information to those who pass by. This is done by utilising the unique UUID of each Bluetooth beacon. This is entirely optional, however should this option be selected during the setup process, this UUID is mapped to more useful information regarding the location and together, this is stored in an external database. The information that may be included here is:

<h4 id="table-2" align="center" class="fs-4 fw-50">
    <u>Table 2: Optional Additional Information</u>
</h4>

| Location attribute | Required? | Description                                                                                           |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------- |
| NMW location code  | **Yes**   | The location code according to this standard                                                          |
| Name               | **Yes**   | A name for the location. This could be, for example the name of a business                            |
| Description        | **Yes**   | A field that must be included to provide the user with more meaningful information about the location |
| Website            | No        | This is optional and should only be present if the website is accessible for visually impaired users  |

### Expansion Packs

As part of our desire to ensure that our application is usable by users without internet connection, any NarrateMyWay beacon detected by the app will at the very least provide users with the information outlined in [Table 1](#table-1) above.

However, with our intended desire to use the NarrateMyWay system within larger organisations, we provide users with the option to download Expansion Packs, which allow the more enriched information of [Table 2](#table-2) to be provided to the user.

The intention is that each of these organisations will setup beacons with this additional information, and this is stored externally on a database. Users will then be able to download this information in the form of an Expansion Pack, either provided by representatives of the organisation at the location, or downloadable via the application itself as explained below.

### 2. Expansion Pack Beacons

As outlined above, it is possible for each beacon setup using NarrateMyWay to provide enriched information which makes use of the UUID of the beacon. If setup to include this additional information, these details along with the UUID are stored in an external database. The purpose of these Expansion Pack Beacons, is to allow a user to easily download these packs when they come across such a beacon:

<embed src="../images/NMW-Main-New-Location.pdf" type="application/pdf" width="100%" height="600px" />

Upon detecting such a beacon, the user is presented with an option to download the related Expansion Pack to their device allowing a richer experience when passing beacons that are included in the pack.

### Connection and Disconnect Timings

When scanning the app has two stages. The first stage is the generation of a list of nearby devices. This is done for two seconds. After these two seconds, the closest beacon is chosen (based on RSSI of the devices). After four seconds, the device list is reset and the scanning starts again. This ensures a updated record is maintained.

In order to reduce interference caused by temporary loss of a beacon signal, delays have been incorporated into switching of screens. When the app detects a beacon, it switches from the scanning page to the main page on the app. Once this has happened, it will remain there for thirty seconds. This is regardless of other beacons that are detected or if the beacon signal drops. After the thirty second time period, if the beacon signal has dropped, the app will return to the scanning screen. If another beacon is detected when this beacon has dropped, it will update with this new information. Similarly, if a different beacon is detected that is closer to the current beacon, the main screen may update to reflect this but again only after this thirty second time period. Whenever a beacon is detected and chosen, the thirty second second timer resets.
