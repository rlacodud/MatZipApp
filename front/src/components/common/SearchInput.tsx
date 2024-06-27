import { colors } from '@/constants';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface SearchInputProps {
  onSubmit: () => void;
}

function SearchInput({onSubmit, ...props}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize='none'
        placeholderTextColor={colors.GRAY_500}
        returnKeyType='search'
        onSubmitEditing={onSubmit}
        clearButtonMode='while-editing'
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({});

export default SearchInput;