import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { settingNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen';
import useThemeStore from '@/store/useThemeStore';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
  [settingNavigations.DELETE_ACCOUNT]: undefined;
  [settingNavigations.EDIT_CATEGORY]: undefined;
}

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: {
        backgroundColor: colors[theme].GRAY_100,
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
            backgroundColor: colors[theme].WHITE
          }
        }}
        name={settingNavigations.EDIT_PROFILE} 
        component={EditProfileScreen} 
      />
      <Stack.Screen
        options={{
          headerTitle: '회원 탈퇴',
          cardStyle: {
            backgroundColor: colors[theme].WHITE
          }
        }}
        name={settingNavigations.DELETE_ACCOUNT} 
        component={DeleteAccountScreen} 
      />
      <Stack.Screen
        options={{
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE
          }
        }}
        name={settingNavigations.EDIT_CATEGORY} 
        component={EditCategoryScreen} 
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default SettingStackNavigator;