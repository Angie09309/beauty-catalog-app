import { MakeupProduct, infoProduct } from "../types/index";
const precioDeterminado = 6000;

export default function mapearProducto(producto: MakeupProduct): infoProduct {
  const precioOriginal = Number(producto.price);
  const precioValido = Number.isFinite(precioOriginal) && precioOriginal > 0;
  const precioFinal = precioValido ? precioOriginal : precioDeterminado;
  return {
    id: String(producto.id),
    name: producto.name,
    brand: producto.brand ?? "Sin marca",
    category: producto.category ?? "General",
    price: precioFinal,
    imageUrl: producto.image_link,
    description: producto.description,
    productType: producto.product_type || "Otros",
  };
}
