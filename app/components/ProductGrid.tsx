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
    <section className="grid w-full min-w-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-8">
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
