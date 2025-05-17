import {Alert} from 'react-native';
import {axiosInstance} from '../axiosInstance';

type UpdateUserProfileParams = {
  firstName: string;
  lastName: string;
  profileImage?: File;
};

export async function updateUserProfile({
  firstName,
  lastName,
  profileImage,
}: UpdateUserProfileParams) {
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);

  if (profileImage) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (profileImage.size > maxSize) {
      Alert.alert('Profile image must be less than 5MB.');
    }
    else{
    formData.append('profileImage', profileImage)
    }
  }

  const response = await axiosInstance.put('/user/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
