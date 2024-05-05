import React from 'react';
import {StyleSheet} from 'react-native';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import useAuth from '@/hooks/queries/useAuth';

interface RootNavigatorProps {

}

function RootNavigator({}: RootNavigatorProps) {
  const {isLogin} = useAuth();

  return (
    <>{ isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator/> }</>
  )
}

const styles = StyleSheet.create({});

export default RootNavigator;