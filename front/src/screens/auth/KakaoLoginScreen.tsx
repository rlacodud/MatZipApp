import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import WebView from 'react-native-webview';

interface KakaoLoginScreenProps {

}

const REDIRECT_URI = 'http://localhost:3030/auth/oauth/kakao';

function KakaoLoginScreen({}: KakaoLoginScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{
        uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
      }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default KakaoLoginScreen;