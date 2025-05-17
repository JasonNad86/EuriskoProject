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
    formData.append('profileImage', profileImage);
  }

  const response = await axiosInstance.put('/user/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    isAuth: true,
  } as any);

  return response.data;
}
