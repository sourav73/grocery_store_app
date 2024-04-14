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

export type ProductInput = Omit<
  Product,
  'name' | 'imagePath' | 'description' | 'discountedPrice' | 'weight'
>;

export interface GroupedProducts {
  categoryName: string;
  products: Product[];
}

export interface DeliveryInfo {
  deliveryAddress: string;
  email: string;
  name: string;
  paymentType: string;
  phone: string;
  transactionId: string;
}

export interface CreateOrderInput {
  deliveryInfo: DeliveryInfo;
  products: ProductInput[];
}
