import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import React, { ReactNode } from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';

interface SettingItemProps extends PressableProps {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
  color?: string;
}

function SettingItem({
  title,
  subTitle,
  icon = null,
  color,
  ...props
}: SettingItemProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}
    >
      {icon}
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, {color: color ?? colors[theme].BLACK}]}>
          {title}
        </Text>
        {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
      </View>
    </Pressable>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: colors[theme].WHITE,
    borderColor: colors[theme].GRAY_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors[theme].GRAY_200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '500',
  },
  subTitleText: {
    color: '#9D9D9D',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default SettingItem;