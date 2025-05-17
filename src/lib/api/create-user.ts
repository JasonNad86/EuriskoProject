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
    formData.append('profileImage', profileImage);
  }

  const response = await axiosInstance.post('/auth/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
