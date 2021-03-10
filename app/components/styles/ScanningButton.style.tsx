import { StyleSheet } from 'react-native';

const theme1 = StyleSheet.create({
  container: {
    elevation: 8,
    backgroundColor: '#093f74',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '20%',
    borderRadius: 50
  },
  text: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    justifyContent: 'center',
    textAlign: 'center'
  }
});

const theme2 = StyleSheet.create({
  container: {
    elevation: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '20%',
    borderRadius: 50
  },
  text: {
    fontSize: 42,
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    justifyContent: 'center',
    textAlign: 'center'
  }
});

const themeDefault = StyleSheet.create({
  container: {
    elevation: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '20%',
    borderRadius: 50
  },
  text: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    justifyContent: 'center',
    textAlign: 'center'
  }
});

export { theme1, theme2, themeDefault };
