export interface infoProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends infoProduct {
  quantity: number;
}
