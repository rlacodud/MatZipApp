import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import InputFiled from '../../components/InputFiled';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';

interface LoginScreenProps {

}

function LoginScreen({}: LoginScreenProps) {
  const login = useForm({initialValue: {
    email: '',
    password: '',
  }});

  const handleSubmit = () => {
    console.log('values', login.values);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputFiled
          placeholder='이메일'
          error={'이메일을 입력하세요'}
          touched={login.touched.email}
          inputMode='email'
          {...login.getTextInputProps('email')}
        />
        <InputFiled
          placeholder='비밀번호'
          error={'비밀번호를 입력하세요'}
          touched={login.touched.password}
          secureTextEntry
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label='로그인'
        varient='filled'
        size='large'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  }
});

export default LoginScreen;
