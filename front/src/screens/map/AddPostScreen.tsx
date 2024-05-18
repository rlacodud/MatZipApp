import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import InputFiled from '@/components/InputFiled';
import MarkerSelector from '@/components/MarkerSelector';
import { colors, mapNavigations } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MarkerColor } from '@/types/domain';
import { validateAddPost } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Opticons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const addPost = useForm({
    initialValue: {title: '', description: '',},
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const address = useGetAddress(location);

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  }

  const handleSubmit = () => {
    const body = {
      date: new Date(),
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor, 
      score,
      imageUris: []
    }
    createPost.mutate({address, ...location, ...body}, {
      onSuccess: () => navigation.goBack(),
    });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        AddPostHeaderRight(handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputFiled value={address} disabled icon={
            <Opticons 
              name='location' 
              size={16} 
              color={colors.GRAY_500} 
            />
          }/>
          <CustomButton varient='outlined' size='large' label='날짜 선택' />
          <InputFiled
            placeholder='제목을 입력하세요.'
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputFiled
            ref={descriptionRef}
            placeholder='기록하고 싶은 내용을 입력하세요. (선택)'
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType='next'
            blurOnSubmit={false}
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector 
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  }
});

export default AddPostScreen;