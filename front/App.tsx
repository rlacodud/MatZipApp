import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from './src/navigations/root/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/api/queryClient';

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
