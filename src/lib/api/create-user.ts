import {axiosInstance} from '../axiosInstance';
import {Alert} from 'react-native';

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
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    if (profileImage) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (profileImage.size > maxSize) {
        Alert.alert('Profile image must be less than 5MB.');
      } else {
        formData.append('profileImage', profileImage);
      }
    }

    console.log('🔍 Sending signup form:', { email, password, firstName, lastName });

    const response = await axiosInstance.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('✅ Signup success response:', response.data);
    return response.data;
  } catch (error: any) {
    console.log('❌ Signup error:', error?.response?.data || error.message);
    throw error;
  }
}
