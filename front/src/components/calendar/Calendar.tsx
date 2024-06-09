import { colors } from '@/constants';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DayOfWeek from './DayOfWeek';

interface CalendarProps {

}

function Calendar({}: CalendarProps) {
  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButtonContainer}>
          <Ionicons name='arrow-back' size={25} color={colors.BLACK}/>
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>2024년 10월</Text>
        </Pressable>
        <Pressable style={styles.monthButtonContainer}>
          <Ionicons name='arrow-forward' size={25} color={colors.BLACK} />
        </Pressable>
      </View>
      <DayOfWeek/>
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthButtonContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  }
});

export default Calendar;