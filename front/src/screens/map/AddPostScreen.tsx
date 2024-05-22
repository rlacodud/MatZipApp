import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import DatePickerOption from '@/components/DatePickerOption';
import ImageInput from '@/components/ImageInput';
import InputFiled from '@/components/InputFiled';
import MarkerSelector from '@/components/MarkerSelector';
import PreviewImageList from '@/components/PreviewImageList';
import ScoreInput from '@/components/ScoreInput';
import { colors, mapNavigations } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MarkerColor } from '@/types/domain';
import { getDateWithSeparator, validateAddPost } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
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
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const dateOption = useModal();
  const imagePicker = useImagePicker({
    initialImages: [],
  });
  usePermission('PHOTO');

  console.log(imagePicker.imageUris);

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  }

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  }

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  }

  const handleChangeScore = (value: number) => {
    setScore(value);
  }

  const handleSubmit = () => {
    const body = {
      date,
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
          <CustomButton 
            varient='outlined' 
            size='large' 
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
            onPress={dateOption.show}
          />
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
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput 
            score={score}
            onChangeScore={handleChangeScore}
          />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange}/>
            <PreviewImageList 
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>
          <DatePickerOption 
            date={date} 
            isVisible={dateOption.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
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
  },
  imagesViewer: {
    flexDirection: 'row',
  }
});

export default AddPostScreen;