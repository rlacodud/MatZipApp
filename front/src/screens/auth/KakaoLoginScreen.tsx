import useAuth from '@/hooks/queries/useAuth';
import axios from 'axios';
import React from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

const REDIRECT_URI = `${Platform.OS === 'ios'
  ? 'http://localhost:3030/'
  : 'http://10.0.2.2:3030/'
  }auth/oauth/kakao`;

function KakaoLoginScreen() {
  const {kakaoLoginMutation} = useAuth();

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if(event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
  
      requestToken(code);
    }
  };
  
  const requestToken = async(code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }
    });
  
    console.log('response.data', response.data);
    kakaoLoginMutation.mutate(response.data.access_token);
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{
        uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
      }}
      onMessage={handleOnMessage}
      injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default KakaoLoginScreen;