import { SysProduct, infoProduct } from "../types/index";

export default function mapearProducto(producto: SysProduct): infoProduct {
  return {
    id: producto.product_id,
    name: producto.name,
    brand: producto.brand_name,
    category: "General",
    price: Number(producto.price),
    imageUrl: `https://sysvariedades.com.co/sistema/public/images/uploads/products/${producto.product_image_name}`,
    description: producto.description,
  };
}
