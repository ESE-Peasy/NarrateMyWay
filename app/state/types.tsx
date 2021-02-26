export type BLEBeacon = {
  beaconName: string;
  beaconId: string;
};

export type BeaconDetectedAction = {
  type: string;
  beacon: BLEBeacon;
};

export type BeaconOutOfRangeAction = {
  type: string;
};

export type BeaconStateAction = BeaconDetectedAction | BeaconOutOfRangeAction;

export type BeaconState = BLEBeacon[];

export type AppState = {
  beaconState: BeaconState;
};