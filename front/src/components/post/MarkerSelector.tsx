import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomMarker from '../common/CustomMarker';
import { colors } from '@/constants';
import { MarkerColor } from '@/types/domain';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';

interface MarkerSelectorProps {
  score?: number;
  markerColor: MarkerColor;
  onPressMarker: (color:MarkerColor) => void;
}

const categoryList:MarkerColor[] = ['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'];

function MarkerSelector({
  score = 5, 
  markerColor, 
  onPressMarker
}: MarkerSelectorProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {categoryList.map((color, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => onPressMarker(color)}
              style={[
                styles.markerBox,
                markerColor === color && styles.pressedMarker
              ]}>
              <CustomMarker color={color} score={score} />
            </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors[theme].GRAY_200,
    padding: 15,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors[theme].GRAY_700,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors[theme].GRAY_100,
    borderRadius: 6,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors[theme].RED_500
  }
});

export default MarkerSelector;