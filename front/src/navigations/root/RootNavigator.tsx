import React, { useEffect } from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import useAuth from '@/hooks/queries/useAuth';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import SplashScreen from 'react-native-splash-screen';

function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if(!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();        
      }, 500);
    }
  }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      { isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator/> }
    </RetryErrorBoundary>
  )
}

export default RootNavigator;