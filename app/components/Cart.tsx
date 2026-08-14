import { CartItem } from "../types/index";
import CartItemRow from "./CartItemRow";
import { formatearPrecio } from "../utils/format";

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

  function generarEnlaceWhatsApp() {
    let numeroTelefono = "573112140676";
    let frase = "Hola, me gustaría pedir:\n\n";

    cartItems.forEach((item) => {
      frase +=
        "• *" +
        item.name +
        "* (x" +
        item.quantity +
        ") -" +
        formatearPrecio(item.price) +
        "\n";
    });
    frase += "\nSubtotal: " + formatearPrecio(subtotal);

    const mensajeCodificado = encodeURIComponent(frase);
    return "https://wa.me/" + numeroTelefono + "?text=" + mensajeCodificado;
  }

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

      <h3>{formatearPrecio(subtotal)}</h3>

      <a
        href={generarEnlaceWhatsApp()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Hacer pedido por WhatsApp
      </a>

      <p>
        Abrimos WhatsApp con tu lista de productos y el total ya escritos en el
        mensaje.
      </p>
    </div>
  );
}
