import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Button, StyleSheet, View } from 'react-native';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavaigations } from '../../constants';
import CustomButton from '../../components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavaigations.AUTH_HOME>

function AuthHomeScreen({navigation}:AuthHomeScreenProps) {
  return (
    <SafeAreaView>
        <View>
            <CustomButton
              label='로그인하기'
              onPress={() => navigation.navigate(authNavaigations.LOGIN)}
            />
            <CustomButton
              label='회원가입하기'
              varient='outlined'
              onPress={() => navigation.navigate(authNavaigations.SIGNUP)}
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default AuthHomeScreen;
