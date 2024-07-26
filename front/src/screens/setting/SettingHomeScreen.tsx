import DarkModeOption from '@/components/setting/DarkModeOption';
import SettingItem from '@/components/setting/SettingItem';
import { colors, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const darkModeOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const {theme} = useThemeStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space}/>
        <SettingItem title='프로필 수정' onPress={handlePressEditProfile} />
        <SettingItem title='마커 카테고리 설정' onPress={handlePressEditCategory} />
        <SettingItem title='다크 모드' onPress={darkModeOption.show} />
        <View style={styles.space}/>
        <SettingItem 
          title='로그아웃' 
          color={colors[theme].RED_500}
          icon={
            <Octicons
              name='sign-out' 
              color={colors[theme].RED_500} 
              size={16}
            />
          }
          onPress={handlePressLogout}
        />
        <DarkModeOption isVisible={darkModeOption.isVisible} hideOption={darkModeOption.hide} />
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