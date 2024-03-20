import { Product } from '../../pages/products/product-type';

export interface Cart {
  totalPrice: number;
  discountedPrice: number;
  savedAmount:number;
  totalProducts: number;
  products: Product[];
}
