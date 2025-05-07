export interface Product {
  _id: string;
  title: string;
  price: number;
  images: Array<{ url: string }>;
}