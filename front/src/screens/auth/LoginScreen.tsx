import React, { useRef } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput } from 'react-native';
import InputFiled from '@/components/common/InputFiled';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants';

interface LoginScreenProps {

}

function LoginScreen({}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {email: '', password: '',},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error => 
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          position: 'bottom',
          visibilityTime: 2000,
        })
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputFiled
          autoFocus
          placeholder='이메일'
          error={login.errors.email}
          touched={login.touched.email}
          inputMode='email'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputFiled
          ref={passwordRef}
          placeholder='비밀번호'
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType='join'
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
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
