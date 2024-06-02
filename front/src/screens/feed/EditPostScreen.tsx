import { feedNavigations, mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import PostForm from '@/components/post/PostForm';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>

function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostForm location={location} isEdit/>
}

export default EditPostScreen;