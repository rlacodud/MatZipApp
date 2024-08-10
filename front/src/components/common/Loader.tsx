import { colors } from '@/constants';
import React, { PropsWithChildren, ReactNode } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

interface LoaderProps {
  children?: ReactNode;
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}

function Loader({
  children,
  size = 'small',
  color = colors.light.GRAY_500,
  ...props
}: PropsWithChildren<LoaderProps>) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={color}
        style={styles.indicator}
        {...props}
      />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginBottom: 20,
  }
});

export default Loader;