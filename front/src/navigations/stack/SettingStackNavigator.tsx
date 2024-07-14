import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { settingNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
}

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: {
        backgroundColor: colors.GRAY_100,
      },
      headerStyle: {
        backgroundColor: 'white',
        shadowColor: 'gray',
      },
      headerTitleStyle: {
        fontSize: 15,
      },
      headerTintColor: 'black',
    }}>
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
        name={settingNavigations.SETTING_HOME} 
        component={SettingHomeScreen} 
      />
      <Stack.Screen
        options={{
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors.WHITE
          }
        }}
        name={settingNavigations.EDIT_PROFILE} 
        component={EditProfileScreen} 
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default SettingStackNavigator;