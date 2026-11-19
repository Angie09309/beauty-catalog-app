import { useState } from "react";
import { infoProduct } from "../types";
import { formatearPrecio } from "../utils/format";
import { getFallbackImage } from "../utils/productImages";

interface ProductCardProps {
  unProducto: infoProduct;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (unProducto: infoProduct) => void;
}

export default function ProductCard({
  unProducto,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const [imagenActual, setImagenActual] = useState(unProducto.imageUrl);
  return (
    <div className="w-full min-w-0 h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-sm">
      <div className="w-full aspect-7/10 overflow-hidden relative group">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-101"
          src={imagenActual}
          alt={unProducto.name}
          onError={() => {
            setImagenActual(getFallbackImage(unProducto.productType));
          }}
        />

        <button
          className="flex gap-1.5 bg-primary px-2 py-2 items-center justify-center text-white text-xs sm:text-sm font-medium hover:bg-primary-hover active:scale-95 duration-500 ease-in-out absolute bottom-0 w-full opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
          onClick={() => onAddToCart({ ...unProducto, imageUrl: imagenActual })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus-icon lucide-plus h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Agregar al pedido
        </button>

        <button
          className={`absolute top-3 right-3  bg-amber-50/60 rounded-4xl p-1.5 duration-500  hover:text-destructive group-hover:opacity-100
     ${isFavorite ? "text-destructive opacity-100" : "text-ring opacity-100"}
         `}
          onClick={() => onToggleFavorite(unProducto.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </button>
      </div>

      <div className="p-2 sm:p-3 lg:p-4 flex flex-col grow space-y-2">
        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium">
          {unProducto.brand}
        </span>
        <div className="flex flex-col items-start gap-1.5 sm:gap-2">
          <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
            {unProducto.name}
          </h3>
          <span className="text-sm sm:text-base text-primary font-medium">
            {formatearPrecio(unProducto.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
