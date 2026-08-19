import mapearProducto from "./productMapper";
import { MakeupProduct } from "../types/index";

const productoPrueba: MakeupProduct = {
  id: 1,
  name: "Essence Mascara Lash Princess",
  description: "Máscara de pestañas...",
  category: "beauty",
  price: "9.99",
  brand: "Essence",
  image_link: "",
  product_type: "Mascara",
};

const producto = mapearProducto(productoPrueba);
