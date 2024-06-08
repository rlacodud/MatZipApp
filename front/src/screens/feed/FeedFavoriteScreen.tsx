import { colors } from '@/constants';
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface FeedFavoriteScreenProps {

}

function FeedFavoriteScreen({}: FeedFavoriteScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>즐겨찾기 스크린</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  }
});

export default FeedFavoriteScreen;