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
  return (
    <div>
      <h1>Tu pedido</h1>
      <p>Revisa tus productos y envíanos el pedido por WhatsApp.</p>

      {cartItems.map((article) => (
        <CartItemRow
          key={article.id}
          productCart={article}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
}
