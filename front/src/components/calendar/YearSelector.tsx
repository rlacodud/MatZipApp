import { colors, numbers } from '@/constants';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  currentYear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
  return (
    <>
    {isVisible && (
      <View style={styles.container}>
        <View style={styles.yearsContainer}>
          <FlatList
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
            data={Array.from({
              length:
                numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
            }, (_, index) => ({
              id: index,
              num: index + numbers.MIN_CALENDAR_YEAR
            }))}
            renderItem={({item}) => (
              <Pressable
                key={item.num}
                onPress={() => onChangeYear(item.num)}
                style={[
                  styles.yearButton, 
                  currentYear === item.num && styles.currentYeatButton
                ]}
              >
                <Text
                  style={[
                    styles.yearText, 
                    currentYear === item.num && styles.currentYeatText
                  ]}
                >{item.num}</Text>
              </Pressable>
            )}
            keyExtractor={item => String(item.num)}
            numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
          />
        </View>
        <Pressable style={styles.closeButton} onPress={hide}>
          <Text style={styles.closeText}>닫기</Text>
          <MaterialIcons 
            name='keyboard-arrow-down'
            size={20}
            color={colors.BLACK}
          />
        </Pressable>
      </View>
    )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  yearsContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE
  },
  scrollContainer: {
    maxHeight: 200,
    backgroundColor: colors.WHITE,
  },
  yearButton: {
    width: 80,
    height: 40,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentYeatButton: {
    backgroundColor: colors.PINK_700,
    borderColor: colors.PINK_700,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.GRAY_700,
  },
  currentYeatText: {
    color: colors.WHITE,
    fontWeight: '600',
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.GRAY_500
  },
  closeText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default YearSelector;