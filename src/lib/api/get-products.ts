import { axiosInstance } from '../axiosInstance';

type GetProductsParams = {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
};

export async function getProducts(params: GetProductsParams = {}) {
  const finalParams = {
    order: 'desc', 
    ...params,     
  };

  const response = await axiosInstance.get('/products', {
    params: finalParams,
  });

  return response.data;
}
