import { CartItem } from "../types/index";

interface CartProps {
  cartItems: CartItem[];
}

export default function Cart({ cartItems }: CartProps) {
  return (
    <div>
      <h1>Tu pedido</h1>
      <p>Revisa tus productos y envíanos el pedido por WhatsApp.</p>

      {cartItems.map((productCart) => (
        <div key={productCart.id}>
          <div>
            <img src={productCart.imageUrl} alt={productCart.name} />
          </div>

          <div>
            <h2>{productCart.name}</h2>
            <p>{productCart.brand}</p>
            <span>{productCart.price}</span>
          </div>

          <div>
            <button>-</button>
            <button>{productCart.quantity}</button>
            <button>+</button>
          </div>

          <div>
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
          </div>
        </div>
      ))}
    </div>
  );
}
