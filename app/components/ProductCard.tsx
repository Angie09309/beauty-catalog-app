import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-64 h-120 flex flex-col bg-card border border-card-border rounded-3xl overflow-hidden shadow-md m-2 transition-all  duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-72 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      <div className="p-5 flex flex-col grow space-y-4">
        <span className="text-sm text-text-muted uppercase tracking-widest font-medium">
          {product.brand}
        </span>
        <h3 className="text-base font-semibold line-clamp-2">{product.name}</h3>
        <span className="text-primary font-bold">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(product.price)}
        </span>

        <button className=" flex flex-row gap-2 bg-primary rounded-2xl p-2 items-center justify-center text-white mt-auto hover:bg-primary-hover active:scale-95  duration-200 ease-in-out">
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
      </div>
    </div>
  );
}
