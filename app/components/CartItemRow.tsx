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
    <div>
      <div>
        <img src={productCart.imageUrl} alt={productCart.name} />
      </div>

      <div>
        <h2>{productCart.name}</h2>
        <p>{productCart.brand}</p>
        <span>{formatearPrecio(productCart.price)}</span>
      </div>

      <div>
        <button
          onClick={() =>
            onUpdateQuantity(productCart.id, productCart.quantity - 1)
          }
        >
          -
        </button>

        <button>{productCart.quantity}</button>

        <button
          onClick={() =>
            onUpdateQuantity(productCart.id, productCart.quantity + 1)
          }
        >
          +
        </button>
      </div>

      <div>
        <button onClick={() => onRemove(productCart.id)}>
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
            className="lucide lucide-trash2-icon lucide-trash-2"
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
