import {Alert} from 'react-native';
import {axiosInstance} from '../axiosInstance';

export type CreateUserParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImage?: File;
};

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  profileImage,
}: CreateUserParams) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);

  if (profileImage) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (profileImage.size > maxSize) {
      Alert.alert('Profile image must be less than 5MB.');
    }
    formData.append('profileImage', profileImage);
  }

  const response = await axiosInstance.post('/auth/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
