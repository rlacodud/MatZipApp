import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <AuthStackNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: 100,
    height: 50,
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
