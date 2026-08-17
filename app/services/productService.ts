import { DummyProductsResponse } from "../types";

export async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  console.log(data);
}
