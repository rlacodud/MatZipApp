import { colors, feedTabNavigations } from "@/constants"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedStackNavigator from "../stack/FeedStackNavigator";
import FeedFavoriteScreen from "@/screens/feed/FeedFavoriteScreen";
import { StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedHomeHeaderLeft from "@/components/feed/FeedHomeHeaderLeft";

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: undefined;
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
  let iconName = '';

  switch(route.name) {
    case feedTabNavigations.FEED_HOME: {
      iconName = focused ? 'reader' : 'reader-outline'
      break;
    }
    case feedTabNavigations.FEED_FAVORITE: {
      iconName = focused ? 'star' : 'star-outline'
      break;
    }
  }

  return (
    <Ionicons 
      name={iconName} 
      size={25} 
      color={focused?colors.PINK_700:colors.GRAY_500}
    />
  )
}

function FeedTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200
        },
        headerTitleStyle: {
          fontSize: 15
        },
        headerTintColor: colors.BLACK,
        tabbarShowLabel: false,
        tabBarActiveTintColor: colors.PINK_700,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderTopColor: colors.GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused)
      })}>
      <Tab.Screen 
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          headerTitle: '즐겨찾기',
          headerLeft: () => FeedHomeHeaderLeft(navigation)
        })}
      />
    </Tab.Navigator>
  )
}

export default FeedTabNavigator;
