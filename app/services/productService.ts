import { MakeupProduct, infoProduct } from "../types";
import mapearProducto from "../utils/productMapper";

export async function getProducts(): Promise<infoProduct[]> {
  const response = await fetch(
    "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation",
  );

  const data: MakeupProduct[] = await response.json();

  const productosMapeados = data.map(mapearProducto);
  return productosMapeados;
}
