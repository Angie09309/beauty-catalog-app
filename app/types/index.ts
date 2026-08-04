export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
