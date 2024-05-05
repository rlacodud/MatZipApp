import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';

interface MainDrawerNavigatorProps {

}
const Drawer = createDrawerNavigator();

function MainDrawerNavigator({}: MainDrawerNavigatorProps) {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name='MapHome' component={MapHomeScreen}/>
            <Drawer.Screen name='FeedHome' component={FeedHomeScreen}/>
            <Drawer.Screen name='CalendarHome' component={CalendarHomeScreen}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;