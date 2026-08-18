import mapearProducto from "./productMapper";
import { DummyProduct } from "../types/index";

const productoPrueba: DummyProduct = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description: "Máscara de pestañas...",
  category: "beauty",
  price: 9.99,
  brand: "Essence",
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  ],
};

const productoValushy = mapearProducto(productoPrueba);
