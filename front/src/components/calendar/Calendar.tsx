import { colors } from '@/constants';
import React, { useEffect } from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DayOfWeek from '@/components/calendar/DayOfWeek';
import { MonthYear, isSameAsCurrentDate } from '@/utils';
import { FlatList } from 'react-native-gesture-handler';
import DateBox from '@/components/calendar/DateBox';
import YearSelector from '@/components/calendar/YearSelector';
import useModal from '@/hooks/useModal';
import { useNavigation } from '@react-navigation/native';
import CalendarHomeHeaderRight from '@/components/calendar/CalendarHomeHeaderRight';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T>;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
  moveToToday: () => void;
}

function Calendar<T>({
  monthYear, 
  selectedDate, 
  schedules,
  onPressDate, 
  onChangeMonth,
  moveToToday,
}: CalendarProps<T>) {
  const {month, year, lastDate, firstDOW} = monthYear;
  const navigation = useNavigation();
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12)
    yearSelector.hide();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight(moveToToday),
    })
  }, [moveToToday, navigation]);

  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable 
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}
        >
          <Ionicons name='arrow-back' size={25} color={colors[theme].BLACK}/>
        </Pressable>
        <Pressable 
          style={styles.monthYearContainer}
          onPress={yearSelector.show}
        >
          <Text style={styles.titleText}>{year}년 {month}월</Text>
          <MaterialIcons name='keyboard-arrow-down' size={20} color={colors[theme].GRAY_500} />
        </Pressable>
        <Pressable 
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}
        >
          <Ionicons name='arrow-forward' size={25} color={colors[theme].BLACK} />
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
      <YearSelector 
        isVisible={yearSelector.isVisible} 
        currentYear={year}
        onChangeYear={handleChangeYear}
        hide={yearSelector.hide}
      />
    </>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
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
    color: colors[theme].BLACK,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors[theme].GRAY_300,
    backgroundColor: colors[theme].GRAY_100,
  }
});

export default Calendar;