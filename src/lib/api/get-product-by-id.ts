import { axiosInstance } from '../axiosInstance';

export async function getProductById(id: string) {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
}
