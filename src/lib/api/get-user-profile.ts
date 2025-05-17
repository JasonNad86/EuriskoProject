import { axiosInstance } from '../axiosInstance';

export async function getUserProfile(id?:string) {
     const endpoint = id ? `/user/profile/${id}` : '/user/profile';
     
    const response = await axiosInstance.get(endpoint);
  return response.data;
}