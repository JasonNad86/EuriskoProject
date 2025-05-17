import { axiosInstance } from '../axiosInstance';

type SearchProductsParams = {
  query: string;
};

export async function searchProducts({ query }: SearchProductsParams) {
  const response = await axiosInstance.get('/products/search', {
    params: { query },
  });

  return response.data;
}
