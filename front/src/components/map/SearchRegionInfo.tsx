import { colors } from '@/constants';
import { RegionInfo } from '@/hooks/useSearchLocation';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';

interface SearchRegionInfoProps {
  regionInfo: RegionInfo[];
}

function SearchRegionInfo({regionInfo}: SearchRegionInfoProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator
        indicatorStyle='black'
        contentContainerStyle={styles.scrollContainer}
      >
        {regionInfo.map((info, index) => (
          <Pressable
            key={info.id} 
            style={[
              styles.itemBorder,
              index === regionInfo.length - 1 && styles.noItemBorder
            ]}>
              <View style={styles.placeNameContainer}>
                <Octicons name='location' size={15} color={colors.PINK_700} />
                <Text 
                  style={styles.placeText} 
                  ellipsizeMode='tail' 
                  numberOfLines={1}>
                    {info.place_name}
                </Text>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.distanceText}>{info.distance}</Text>
                <Text style={styles.subInfoText}>{info.category_name}</Text>
              </View>
              <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}
        {regionInfo.length === 0 && (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5,
    height: Dimensions.get('screen').height / 2,
    marginVertical: 5,
    width: '100%',
  },
  scrollContainer: {
    padding: 10,
  },
  itemBorder: {
    marginHorizontal: 5,
    padding: 10,
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 3,
  },
  noItemBorder: {
    borderBottomWidth: 0,
  },
  placeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeText: {
    color: colors.BLACK,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceText: {
    color: colors.BLACK,
  },
  subInfoText: {
    flexShrink: 1,
    color: colors.GRAY_500,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  noResultText: {
    color: colors.GRAY_500,
    fontSize: 10,
  }
});

export default SearchRegionInfo;