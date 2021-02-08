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
    paddingHorizontal: 30,
    paddingVertical: 20
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
  placeIcon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 2,
    borderRadius: 25
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
