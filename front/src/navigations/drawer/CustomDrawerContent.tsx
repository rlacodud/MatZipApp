import { colors, mainNavigations, settingNavigations } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useThemeStore from "@/store/useThemeStore";
import { ThemeMode } from "@/types/common";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {/* 유저 이미지와 카카오톡 이미지 전부 존재하지 않는 경우 */}
            {imageUri === null && kakaoImageUri === null &&
              <Image
                source={require('@/assets/user-default.png')}
                style={styles.userImage}
              />
            }
            {/* 유저 이미지는 없고 카카오톡 이미지는 존재하는 경우 */}
            {imageUri === null && !!kakaoImageUri && (
              <Image
                source={{
                  uri: `${Platform.OS === 'ios'
                  ? `http://localhost:3030`
                  : `http://10.0.2.2:3030`
                  }/${kakaoImageUri}`
                }}
                style={styles.userImage}
              />
            )}
            {/* 유저 이미지가 존재하는 경우 */}
            {imageUri !== null && (
              <Image
                source={{
                  uri: `${Platform.OS === 'ios'
                  ? `http://localhost:3030`
                  : `http://10.0.2.2:3030`
                  }/${imageUri}`
                }}
                style={styles.userImage}
              />
            )}
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
        
      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name="settings" color={colors[theme].GRAY_700} size={18}/>
          <Text style={styles.bottomMenuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors[theme].WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nameText: {
    color: colors[theme].BLACK
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors[theme].GRAY_200,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bottomMenuText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors[theme].GRAY_700,
  }
})

export {CustomDrawerContent};