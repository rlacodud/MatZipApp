import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {getProfileQuery} = useAuth();
  const {email, ninkname, imageUrl, kakaoImageUrl} = getProfileQuery.data || {};
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.userInfoContainer}>
          <Text style={styles.nameText}>{ninkname ?? email}</Text>
        </View>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
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
  }
})

export {CustomDrawerContent};