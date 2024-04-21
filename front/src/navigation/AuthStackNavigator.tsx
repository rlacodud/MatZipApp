import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { authNavaigations } from '../constants';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';

export type AuthStackParamList = {
    [authNavaigations.AUTH_HOME]: undefined;
    [authNavaigations.LOGIN]: undefined;
}

function AuthStackNavigator() {
    const Stack = createStackNavigator<AuthStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name={authNavaigations.AUTH_HOME} component={AuthHomeScreen} />
            <Stack.Screen name={authNavaigations.LOGIN} component={LoginScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;