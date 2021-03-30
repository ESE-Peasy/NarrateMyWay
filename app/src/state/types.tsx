export type Beacon = {
  beaconName: string;
  beaconId: string;
  isExpansionPack: boolean;
};

export type NoBeacon = {};

export type BeaconDetectedAction = {
  type: string;
  beacon: Beacon;
};

export type BeaconOutOfRangeAction = {
  type: string;
};

export type ExpansionPackDetectedAction = {
  type: string;
  beacon: Beacon;
};

export type BeaconStateAction =
  | BeaconDetectedAction
  | BeaconOutOfRangeAction
  | ExpansionPackDetectedAction;

export type CurrentBeacon = Beacon | NoBeacon;

export type AppState = {
  currentBeacon: CurrentBeacon;
};

export type Theme = {
  themeName: string;
};

export type ThemeUpdatedAction = {
  type: string;
  theme: Theme;
};

export type ThemeAction = ThemeUpdatedAction;
