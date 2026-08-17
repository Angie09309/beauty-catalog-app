export interface infoProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string | null;
}

export interface CartItem extends infoProduct {
  quantity: number;
}

export interface SysProduct {
  product_id: string;
  name: string;
  category_id: string | null;
  description: string | null;
  product_image_name: string;
  brand_name: string;
  price: string;
}
