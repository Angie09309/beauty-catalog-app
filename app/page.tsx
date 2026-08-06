import ProductCard from "@/app/components/ProductCard";
import { ProductGrid } from "./components/ProductGrid";
import { PRODUCTS } from "./data/products";

export default function Home() {
  return (
    <main>
      <ProductGrid makeup={PRODUCTS} />
    </main>
  );
}
