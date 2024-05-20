import { getFormDataImages } from "@/utils";
import ImageCropPicker from "react-native-image-crop-picker";
import useMutateImages from "./queries/useMutateImages";
import { useState } from "react";
import { ImageUri } from "@/types/domain";

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const [imageUris, setImageuris] = useState(initialImages);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    setImageuris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  }
  
  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    }).then(images => {
      const formData = getFormDataImages(images);

      uploadImages.mutate(formData, {
        onSuccess: data => addImageUris(data),
      });
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        // 에러 메세지 표시
      }
    })
  }

  return {
    imageUris,
    handleChange,
  }
}

export default useImagePicker;