import Loader from '@/components/common/Loader';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import React, { Suspense } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function FeedFavoriteScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={
        <Loader/>
      }>
        <FeedFavoriteList/>
      </Suspense>
    </SafeAreaView>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].WHITE
  }
});

export default FeedFavoriteScreen;