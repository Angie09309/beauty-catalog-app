export interface infoProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string | null;
  productType: string;
}

export interface CartItem extends infoProduct {
  quantity: number;
}

export interface MakeupProduct {
  id: number;
  name: string;
  brand: string;
  category: string | null;
  price: string;
  image_link: string;
  description: string | null;
  product_type: string;
}
