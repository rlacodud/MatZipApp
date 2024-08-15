import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigations/root/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/api/queryClient';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import CodePush from 'react-native-code-push';
import useCodePush from '@/hooks/useCodePush';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors['light'].BLUE_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors['light'].RED_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App(): React.JSX.Element {
  const {theme} = useThemeStore();
  const {hasUpdate, syncProgress} = useCodePush();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <NavigationContainer>
        {hasUpdate
          ? <View><Text>업데이트 중...</Text></View>
          : <RootNavigator/>
        }
        <Toast config={toastConfig}/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
});

export default CodePush(App);
