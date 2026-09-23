import { infoProduct } from "../types";
import { formatearPrecio } from "../utils/format";

interface ProductCardProps {
  unProducto: infoProduct;
  onAddToCart: (unProducto: infoProduct) => void;
}

const imagenes = {
  labios: ["/img/labios1.png", "/img/labios2.png", "/img/labios3.png"],
  ojos: ["/img/ojos1.png", "/img/ojos2.png", "/img/ojos3.png"],
  rostro: ["/img/rostro1.png", "/img/rostro2.png", "/img/rostro3.png"],
  nail: ["/img/nail1.png", "/img/nail2.png", "/img/nail3.png"],
  placeholder: [
    "/img/placeholder1.png",
    "/img/placeholder2.png",
    "/img/placeholder3.png",
  ],
};

function getFallbackImage(productType: string) {
  let grupoDeImagenes;

  if (productType === "lipstick" || productType === "lip_liner") {
    grupoDeImagenes = imagenes.labios;
  } else if (productType === "eyeliner" || productType === "mascara") {
    grupoDeImagenes = imagenes.ojos;
  } else if (productType === "nail_polish") {
    grupoDeImagenes = imagenes.nail;
  } else if (productType === "foundation") {
    grupoDeImagenes = imagenes.rostro;
  } else {
    grupoDeImagenes = imagenes.placeholder;
  }

  return grupoDeImagenes[Math.floor(Math.random() * grupoDeImagenes.length)];
}

export default function ProductCard({
  unProducto,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="w-70 h-120 flex flex-col shadow-sm overflow-hidden transition-all duration-300 rounded-xs m-3">
      <div className="h-110 overflow-hidden relative group">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-101"
          src={unProducto.imageUrl}
          alt={unProducto.name}
          onError={(e) => {
            e.currentTarget.src = getFallbackImage(unProducto.productType);
          }}
        />

        <button
          className=" flex  gap-2 bg-primary  p-2 items-center justify-center text-white hover:bg-primary-hover active:scale-95  duration-500 ease-in-out absolute bottom-0 opacity-0 translate-y-4 w-full group-hover:opacity-100 group-hover:translate-y-0"
          onClick={() => onAddToCart(unProducto)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus-icon lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Agregar al pedido
        </button>

        <button className="absolute top-4 right-6 text-ring bg-amber-50/60 rounded-4xl p-1.5 duration-500 opacity-0 hover:text-destructive group-hover:opacity-100 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col grow space-y-2">
        <span className="text-sm text-text-muted uppercase tracking-widest font-medium">
          {unProducto.brand}
        </span>
        <div className="flex justify-between">
          <h3 className="text-base font-semibold line-clamp-2">
            {unProducto.name}
          </h3>
          <span className="text-primary font-medium">
            {formatearPrecio(unProducto.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
