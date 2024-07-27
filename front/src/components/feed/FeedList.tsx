import usegetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import React, { useState } from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FeedItem from './FeedItem';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { colors } from '@/constants';

function FeedList() {
  const {
    data: posts, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    refetch
  } = usegetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }

  const handleEndReached = () => {
    if(hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item}/>}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle='black'
    />
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  contentContainer: {
    padding: 15,
    backgroundColor: colors[theme].WHITE
  }
});

export default FeedList;