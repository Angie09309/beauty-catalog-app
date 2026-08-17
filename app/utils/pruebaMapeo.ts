import mapearProducto from "./productMapper";
import { SysProduct } from "../types/index";

const productoPrueba: SysProduct = {
  product_id: "296",
  name: "Base Liquida 1St Scene Atenea x 30ml Almond",
  category_id: "27",
  description: null,
  product_image_name: "1770586038_f1972a4d9a7cc88bdfba.jpg",
  brand_name: "ATENEA",
  price: "31800",
};

const productoValushy = mapearProducto(productoPrueba);

console.log(productoValushy);
