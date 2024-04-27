import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputFiled from '../../components/InputFiled';
import useForm from '../../hooks/useForm';
import { validateSignup } from '../../utils';
import CustomButton from '../../components/CustomButton';

interface SignupScreenProps {

}

function SignupScreen({}: SignupScreenProps) {
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
      <InputFiled
          placeholder='이메일'
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode='email'
          {...signup.getTextInputProps('email')}
        />
        <InputFiled
          placeholder='비밀번호'
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          {...signup.getTextInputProps('password')}
        />
        <InputFiled
          placeholder='비밀번호 확인'
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label='회원가입'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;