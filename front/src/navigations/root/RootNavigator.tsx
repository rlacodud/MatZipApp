import React from 'react';
import {StyleSheet} from 'react-native';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

interface RootNavigatorProps {

}

function RootNavigator({}: RootNavigatorProps) {
    const isLoggedIn = true;

  return (
    <>{ isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator/> }</>
  )
}

const styles = StyleSheet.create({});

export default RootNavigator;