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

export interface DummyProduct {
  id: number;
  title: string;
  description: string | null;
  category: string;
  price: number;
  brand: string;
  images: string[];
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}
