import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  beaconInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  typeContainer: {
    elevation: 8,
    backgroundColor: '#ff9900',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    paddingHorizontal: 20,
    paddingVertical: 50
  },
  typeText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeIconContainer: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeIcon: {
    fontSize: 60,
    textAlign: 'center',
    alignSelf: 'center'
  },
  placeTextContainer: {
    backgroundColor: '#009688',
    elevation: 8,
    borderRadius: 50,
    paddingHorizontal: 70,
    paddingVertical: 20
  },
  placeText: {
    fontSize: 42,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});
