import { colors } from '@/constants';
import { ImageUri } from '@/types/domain';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedindex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedindex = 0}: ImageCarouselProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [initialIndex, setInitialIndex] = useState(pressedindex);

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}
      >
        <Octicons name='arrow-left' size={30} color={colors.WHITE}/>
      </Pressable>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image style={styles.image} source={{
              uri: `${Platform.OS === 'ios'
              ? `http://localhost:3030`
              : `http"//10.0.2.2:3030`
              }/${item.uri}`
              }}
              resizeMode='contain'
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colors.PINK_700,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default ImageCarousel;