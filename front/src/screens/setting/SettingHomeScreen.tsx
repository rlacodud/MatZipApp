import SettingItem from '@/components/setting/SettingItem';
import { colors, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space}/>
        <SettingItem title='프로필 수정' onPress={handlePressEditProfile} />
        <SettingItem title='마커 카테고리 설정' onPress={handlePressEditCategory} />
        <View style={styles.space}/>
        <SettingItem 
          title='로그아웃' 
          color={colors.RED_500}
          icon={
            <Octicons
              name='sign-out' 
              color={colors.RED_500} 
              size={16}
            />
          }
          onPress={handlePressLogout}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  }
});

export default SettingHomeScreen;