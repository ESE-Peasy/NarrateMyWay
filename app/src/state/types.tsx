export type Beacon = {
  beaconName: string;
  beaconId: string;
};

export type NoBeacon = {};

export type BeaconDetectedAction = {
  type: string;
  beacon: Beacon;
};

export type BeaconOutOfRangeAction = {
  type: string;
};

export type BeaconStateAction = BeaconDetectedAction | BeaconOutOfRangeAction;

export type CurrentBeacon = Beacon | NoBeacon;

export type AppState = {
  currentBeacon: CurrentBeacon;
};
