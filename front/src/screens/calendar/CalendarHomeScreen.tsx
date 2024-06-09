import Calendar from '@/components/calendar/Calendar';
import { colors } from '@/constants';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface CalendarHomeScreenProps {

}

function CalendarHomeScreen({}: CalendarHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  }
});

export default CalendarHomeScreen;