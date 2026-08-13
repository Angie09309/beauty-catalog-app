import { Product } from "../types";
import ProductCard from "./ProductCard";

export interface ProductGridProps {
  makeup: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ makeup }: ProductGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-cente w-full">
      {makeup.map((producto) => (
        <ProductCard key={producto.id} product={producto} />
      ))}
    </section>
  );
}
