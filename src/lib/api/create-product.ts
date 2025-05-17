import {axiosInstance} from '../axiosInstance';

type CreateProductParams = {
  title: string;
  description: string;
  price: number;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  images: File[];
};

export async function createProduct({
  title,
  description,
  price,
  location,
  images,
}: CreateProductParams) {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('location', JSON.stringify(location));

  images.slice(0, 5).forEach(file => {
    formData.append('images', file);
  });

  const response = await axiosInstance.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
