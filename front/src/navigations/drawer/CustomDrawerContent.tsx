import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation, getProfileQuery} = useAuth();
  const {email, ninkname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

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
                source={{uri: kakaoImageUri}}
                style={styles.userImage}
              />
            )}
            {/* 유저 이미지가 존재하는 경우 */}
            {imageUri !== null && (
              <Image
                source={{uri: imageUri}}
                style={styles.userImage}
              />
            )}
          </View>
          <Text style={styles.nameText}>{ninkname ?? email}</Text>
        </View>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
      <Pressable style={{alignItems: 'flex-end', padding: 10}} onPress={handleLogout}>
        <Text>로그아웃</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nameText: {
    color: colors.BLACK
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
  }
})

export {CustomDrawerContent};