import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { authNavaigations } from '../../constants';
import AuthHomeScreen from '../../screens/auth/AuthHomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';

export type AuthStackParamList = {
    [authNavaigations.AUTH_HOME]: undefined;
    [authNavaigations.LOGIN]: undefined;
    [authNavaigations.SIGNUP]: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: 'white',
            },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'gray',
            },
            headerTitleStyle: {
                fontSize: 15,
            },
            headerTintColor: 'black',
        }}>
            <Stack.Screen options={{
                headerTitle: '',
                headerShown: false,
            }} name={authNavaigations.AUTH_HOME} component={AuthHomeScreen} />
            <Stack.Screen options={{
                headerTitle: '로그인'
            }} name={authNavaigations.LOGIN} component={LoginScreen} />
            <Stack.Screen options={{
                headerTitle: '회원가입'
            }} name={authNavaigations.SIGNUP} component={SignupScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;