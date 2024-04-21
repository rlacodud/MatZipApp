import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import MapHomeScreen from '../../screens/MapHomeScreen';

interface MainDrawerNavigatorProps {

}
const Drawer = createDrawerNavigator();

function MainDrawerNavigator({}: MainDrawerNavigatorProps) {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name='MapHome' component={MapHomeScreen}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;