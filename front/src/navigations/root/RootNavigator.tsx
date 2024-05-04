import React from 'react';
import {StyleSheet} from 'react-native';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '../../hooks/queries/useAuth';

interface RootNavigatorProps {

}

function RootNavigator({}: RootNavigatorProps) {
    const isLogin = useAuth();

  return (
    <>{ isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator/> }</>
  )
}

const styles = StyleSheet.create({});

export default RootNavigator;