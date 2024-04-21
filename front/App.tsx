/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';

function App(): React.JSX.Element {
  const [name, setName] = useState('');

  const handleInputChange = (text: string) => {
    console.log(text);
    setName(text)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>이름</Text>
        <TextInput style={styles.input} value={name} onChangeText={handleInputChange}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: 100,
    height: 50,
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
