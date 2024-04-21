import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Button, StyleSheet, View } from 'react-native';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavaigations } from '../../constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavaigations.AUTH_HOME>

function AuthHomeScreen({navigation}:AuthHomeScreenProps) {
  return (
    <SafeAreaView>
        <View>
            <Button title='로그인 화면으로 이동' onPress={() => navigation.navigate(authNavaigations.LOGIN)}/>
            <Button title='회원가입 화면으로 이동' onPress={() => navigation.navigate(authNavaigations.SIGNUP)}/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default AuthHomeScreen;
