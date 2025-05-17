import { axiosInstance } from '../axiosInstance';

export async function deleteProduct(id: string) {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
}
