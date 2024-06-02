import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { feedNavigations } from '@/constants/navigations';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import { colors } from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import { LatLng } from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
}

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: {
          backgroundColor: 'white',
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
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
        name={feedNavigations.FEED_HOME} 
        component={FeedHomeScreen} 
      />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100
          }
        }}
        name={feedNavigations.FEED_DETAIL} 
        component={FeedDetailScreen} 
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정'
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default FeedStackNavigator;