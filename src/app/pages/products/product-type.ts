export interface Product {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  discountedPrice: number;
  weight: number;
  discount: number;
  quantity: number;
}

export interface GroupedProducts {
  categoryName: string;
  products: Product[];
}