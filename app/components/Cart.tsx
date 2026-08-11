import { CartItem } from "../types/index";
import CartItemRow from "./CartItemRow";

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const subtotal = cartItems.reduce((alcancia, producto) => {
    return alcancia + producto.price * producto.quantity;
  }, 0);

  return (
    <div>
      <h1>Tu pedido</h1>
      <p>Revisa tus productos y envíanos el pedido por WhatsApp.</p>
      <div>
        {cartItems.map((article) => (
          <CartItemRow
            key={article.id}
            productCart={article}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
      </div>

      <h3>{subtotal}</h3>
      <button>Hacer pedido por WhatsApp</button>
      <p>
        Abrimos WhatsApp con tu lista de productos y el total ya escritos en el
        mensaje.
      </p>
    </div>
  );
}
