import { infoProduct } from "../types";
import ProductCard from "./ProductCard";

export interface ProductGridProps {
  makeup: infoProduct[];
  favorite: string[];
  onToggleFavorite: (productId: string) => void;
  alHacerClicEnAgregar: (unProducto: infoProduct) => void;
}

export function ProductGrid({
  makeup,
  alHacerClicEnAgregar,
  favorite,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-cente w-full">
      {makeup.map((productoIndividual) => (
        <ProductCard
          key={productoIndividual.id}
          unProducto={productoIndividual}
          onAddToCart={alHacerClicEnAgregar}
          isFavorite={favorite.includes(productoIndividual.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}
