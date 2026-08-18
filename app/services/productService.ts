import { DummyProductsResponse } from "../types";
import mapearProducto from "../utils/productMapper";

export async function getProducts() {
  const response = await fetch("https://dummyjson.com/product/category/beauty");

  const data: DummyProductsResponse = await response.json();

  const productosMapeados = data.products.map(mapearProducto);
  return productosMapeados;
}
