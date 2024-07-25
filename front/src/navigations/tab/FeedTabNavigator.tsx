import { colors, feedNavigations, feedTabNavigations } from "@/constants"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedStackNavigator from "../stack/FeedStackNavigator";
import FeedFavoriteScreen from "@/screens/feed/FeedFavoriteScreen";
import { StyleSheet } from "react-native";
import { RouteProp, TabRouter, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedHomeHeaderLeft from "@/components/feed/FeedHomeHeaderLeft";
import useThemeStore from "@/store/useThemeStore";

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL,
    params: {
      id: number,
    },
    initial: false,
  };
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

  const {theme} = useThemeStore();

  return (
    <Ionicons 
      name={iconName} 
      size={25} 
      color={focused?colors[theme].PINK_700:colors[theme].GRAY_500}
    />
  )
}

function FeedTabNavigator() {
  const {theme} = useThemeStore();

  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_200
        },
        headerTitleStyle: {
          fontSize: 15
        },
        headerTintColor: colors[theme].BLACK,
        tabbarShowLabel: false,
        tabBarActiveTintColor: colors[theme].PINK_700,
        tabBarStyle: {
          backgroundColor: colors[theme].WHITE,
          borderTopColor: colors[theme].GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused)
      })}>
      <Tab.Screen 
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName = getFocusedRouteNameFromRoute(tabRoute)
            if (
              routeName === feedNavigations.FEED_DETAIL || 
              routeName === feedNavigations.EDIT_POST ||
              routeName === feedNavigations.IMAGE_ZOOM
            ) {
              return {display: 'none'};
            }
            return {
              backgroundColor: colors[theme].WHITE,
              borderTopColor: colors[theme].GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth
            }
          })(route),
        })}
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
