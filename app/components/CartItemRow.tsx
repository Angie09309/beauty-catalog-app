import { CartItem } from "../types";
import { formatearPrecio } from "../utils/format";

export interface CartItemRowProps {
  productCart: CartItem;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({
  productCart,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="flex gap-3 border border-card-border rounded-2xl shadow-xs my-2.5 p-2 ">
      <img
        src={productCart.imageUrl}
        alt={productCart.name}
        className="w-20 h-20 object-cover rounded-2xl"
      />

      <div className="grow min-w-0 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-medium line-clamp-1">
            {productCart.name}
          </h2>
          <p className="text-xs text-text-muted uppercase tracking-widest mt-0.5">
            {productCart.brand}
          </p>
        </div>
        <span className="text-base text-primary font-bold">
          {formatearPrecio(productCart.price)}
        </span>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div className="flex text-sm items-center border border-card-border rounded-full justify-center overflow-hidden h-8 ">
          <button
            onClick={() =>
              onUpdateQuantity(productCart.id, productCart.quantity - 1)
            }
            className=" h-full flex items-center px-1.5 rounded-full justify-center  hover:bg-brand-border transition-colors active:bg-brand-border "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-minus-icon lucide-minus w-4 h-5"
            >
              <path d="M5 12h14" />
            </svg>
          </button>

          <span className="w-8 text-center ">{productCart.quantity}</span>

          <button
            onClick={() =>
              onUpdateQuantity(productCart.id, productCart.quantity + 1)
            }
            className="h-full flex items-center px-1.5F rounded-full justify-center  hover:bg-brand-border transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus-icon lucide-plus w-5 h-5"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => onRemove(productCart.id)}
          className="p-2 rounded-full text-text-muted hover:text-primary-hover active:bg-primary-hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash2-icon lucide-trash-2 w-4 h-4"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
