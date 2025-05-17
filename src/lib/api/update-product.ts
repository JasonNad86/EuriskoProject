import {axiosInstance} from '../axiosInstance';

type UpdateProductParams = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  images?: File[];
};

export async function updateProduct({
  id,
  title,
  description,
  price,
  location,
  images,
}: UpdateProductParams) {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('location', JSON.stringify(location));

  if (images) {
    images.slice(0, 5).forEach(file => {
      formData.append('images', file);
    });
  }

  const response = await axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
