import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  authFormContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
  },
  formInput: {
    padding: 10,
  },
  submitButton: {
    margin: 10,
    height: 50,
    justifyContent: 'center'
  },
  errorMsg: {
    marginLeft: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red'
  },
  switchScreenText: {
    paddingTop: 20,
    paddingLeft: 10,
  },
  switchBtn: {
    margin: 10,
  },
});

export default styles;
