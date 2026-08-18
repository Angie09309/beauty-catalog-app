import { DummyProduct, infoProduct } from "../types/index";

export default function mapearProducto(producto: DummyProduct): infoProduct {
  return {
    id: String(producto.id),
    name: producto.title,
    brand: producto.brand,
    category: producto.category,
    price: producto.price,
    imageUrl: producto.images[0],
    description: producto.description,
  };
}
