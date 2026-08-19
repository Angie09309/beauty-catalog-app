import { MakeupProduct, infoProduct } from "../types/index";

export default function mapearProducto(producto: MakeupProduct): infoProduct {
  return {
    id: String(producto.id),
    name: producto.name,
    brand: producto.brand,
    category: producto.category ?? "General",
    price: Number(producto.price),
    imageUrl: producto.image_link,
    description: producto.description,
    productType: producto.product_type || "Otros",
  };
}
