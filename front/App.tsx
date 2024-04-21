import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import AuthStackNavigator from './src/navigations/stack/AuthStackNavigator';
import RootNavigator from './src/navigations/root/RootNavigator';

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
