import React from 'react';
import {StyleSheet} from 'react-native';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import useAuth from '@/hooks/queries/useAuth';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

function RootNavigator() {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      { isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator/> }
    </RetryErrorBoundary>
  )
}

export default RootNavigator;