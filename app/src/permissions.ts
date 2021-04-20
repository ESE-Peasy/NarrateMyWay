import { Platform, Alert, Linking, DevSettings } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  Permission,
  requestMultiple,
  checkMultiple
} from 'react-native-permissions';
import RNExitApp from 'react-native-exit-app';

function checkAllPermissions(perms: Permission[]) {
  const reqs = checkMultiple(perms).then((statuses) => {
    const reqs: Permission[] = [];
    for (let i = 0; i < perms.length; i++) {
      if (
        statuses[perms[i]] == RESULTS.DENIED ||
        statuses[perms[i]] == RESULTS.BLOCKED
      ) {
        reqs.push(perms[i]);
      }
    }
    return reqs;
  });
  console.log(reqs);
  return reqs;
}

const checkAndGetAllPermissions = () => {
  let perms: Permission[] = [];
  if (Platform.OS == 'android') {
    perms = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    ];
  } else if (Platform.OS == 'ios') {
    perms = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
  }
  checkAllPermissions(perms).then((reqs) => {
    if (reqs.length > 0) {
      requestMultiple(reqs).then((statuses) => {
        for (let i = 0; i < perms.length; i++) {
          if (
            statuses[perms[i]] == 'denied' ||
            statuses[perms[i]] == 'blocked'
          ) {
            Alert.alert(
              'Permission Denied',
              'You must allow location permissions to use this app. \n Please restart the app after giving location permissions',
              [
                {
                  text: 'Settings',
                  onPress: () => {
                    Linking.openSettings();
                  }
                },
                {
                  text: 'Exit',
                  onPress: () => RNExitApp.exitApp()
                }
              ]
            );
            return;
          }
        }
        Alert.alert('Permission Accepted', 'Please restart the app', [
          {
            text: 'Restart',
            onPress: () => {
              DevSettings.reload();
            }
          }
        ]);
      });
    }
  });
};

export default checkAndGetAllPermissions;
