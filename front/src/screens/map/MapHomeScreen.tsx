import React, { useState } from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import MapView, {Callout, LatLng, LongPressEvent, PROVIDER_GOOGLE} from 'react-native-maps';
import { alerts, colors, mapNavigations } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import { numbers } from "@/constants";
import Toast from 'react-native-toast-message';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const markerModal = useModal();
  const {data: markers = []} = useGetMarkers();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  usePermission('LOCATION');

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  }

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  }

  const handlePressAddPost = () => {
    if(!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE, 
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation
    });
    setSelectLocation(null);
  }

  const handlePressUserLocation = () => {
    if(isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  }

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA
        }}
      >
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker 
            key={id}
            color={color}
            score={score}
            coordinate={coordinate} 
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && (
          <Callout>
            <CustomMarker
              score={1}
              color='BLUE'
              coordinate={selectLocation}
             />
          </Callout>
        )}
      </MapView>
      <Pressable style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name='menu' color={colors.WHITE} size={25}/>
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable
            style={styles.mapButton}
            onPress={handlePressAddPost}
          >
          <MaterialIcons name='add' color={colors.WHITE} size={25}/>
        </Pressable>
        <Pressable
          style={styles.mapButton}
          onPress={handlePressUserLocation}
        >
          <MaterialIcons name='my-location' color={colors.WHITE} size={25}/>
        </Pressable>
      </View>

      <MarkerModal markerId={markerId} isVisible={markerModal.isVisible} hide={markerModal.hide}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  }
});

export default MapHomeScreen;