import { axiosInstance } from '../axiosInstance';

export async function getUserProfile(id?:string) {
     const endpoint = id ? `/user/profile/${id}` : '/user/profile';
     
    const response = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
    isAuth: true,
  } as any);
  return response.data;
}