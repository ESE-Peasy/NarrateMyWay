import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  beaconInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '30%'
  },
  typeContainer: {
    elevation: 8,
    backgroundColor: '#ff9900',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  typeText: {
    fontSize: 42,
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
    justifyContent: 'center',
    width: '95%'
  },
  placeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    borderWidth: 2,
    borderRadius: 25,
    padding: 5
  },
  placeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
    elevation: 8,
    borderRadius: 50,
    width: '70%',
    height: '80%'
  },
  placeText: {
    fontSize: 42,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});
