import { Product } from '../../pages/products/product-type';

export interface Cart {
  totalPrice: number;
  totalProducts: number;
  products: Product[];
}
