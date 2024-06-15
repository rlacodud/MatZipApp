import { colors } from '@/constants';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DayOfWeek from '@/components/calendar/DayOfWeek';
import { MonthYear, isSameAsCurrentDate } from '@/utils';
import { FlatList } from 'react-native-gesture-handler';
import DateBox from '@/components/calendar/DateBox';
import { ResponseCalendarPost } from '@/api';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T>;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}

function Calendar<T>({
  monthYear, 
  selectedDate, 
  schedules,
  onPressDate, 
  onChangeMonth
}: CalendarProps<T>) {
  const {month, year, lastDate, firstDOW} = monthYear;
  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable 
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}
        >
          <Ionicons name='arrow-back' size={25} color={colors.BLACK}/>
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>{year}년 {month}월</Text>
          <MaterialIcons name='keyboard-arrow-down' size={20} color={colors.GRAY_500} />
        </Pressable>
        <Pressable 
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}
        >
          <Ionicons name='arrow-forward' size={25} color={colors.BLACK} />
        </Pressable>
      </View>
      <DayOfWeek/>

      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={Boolean(schedules[item.date])}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
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
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  }
});

export default Calendar;