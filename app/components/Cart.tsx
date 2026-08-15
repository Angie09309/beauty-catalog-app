import { CartItem } from "../types/index";
import CartItemRow from "./CartItemRow";
import { formatearPrecio } from "../utils/format";

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCloseCartX: () => void;
  isCartOpen: boolean;
}

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCloseCartX,
  isCartOpen,
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
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full sm:w-110 flex flex-col p-6 bg-card border-l border-card-border shadow-2xl transition-transform duration-300
    
     ${isCartOpen === true ? "translate-x-0 " : "translate-x-full"}
    `}
    >
      <div className="flex justify-between mb-3 ">
        <h1 className="font-semibold text-3xl  ">Tu pedido</h1>

        <button
          onClick={() => {
            onCloseCartX();
          }}
          className="flex items-center justify-center p-1 border border-transparent rounded-full transition-colors duration-100 hover:text-primary-hover hover:border-current hover:bg-success "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x-icon lucide-x h-6 w-6"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <p className="text-text-muted mb-7 text-sm border-b border-card-border">
        Revisa tus productos y envíanos el pedido por WhatsApp.
      </p>

      <div className="flex flex-col grow overflow-auto h-full">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-basket-icon lucide-shopping-basket w-24 h-24 text-primary m-5"
            >
              <path d="m15 11-1 9" />
              <path d="m19 11-4-7" />
              <path d="M2 11h20" />
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
              <path d="M4.5 15.5h15" />
              <path d="m5 11 4-7" />
              <path d="m9 11 1 9" />
            </svg>
            <p className="text-lg"> Tu pedido está vacío.</p>
            <p className="text-lg">Agrega tus productos favoritos.</p>
          </div>
        ) : (
          cartItems.map((article) => (
            <CartItemRow
              key={article.id}
              productCart={article}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <>
          <div className="flex justify-between my-2 border-t border-card-border ">
            <h3 className="text-2xl">subtotal</h3>
            <span className="text-2xl"> {formatearPrecio(subtotal)}</span>
          </div>

          <a
            href={generarEnlaceWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-3 text-lg bg-danger p-2 rounded-4xl text-white my-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="currentColor"
                d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
              />
            </svg>
            Hacer pedido por WhatsApp
          </a>

          <p className="text-text-muted text-sm">
            Abrimos WhatsApp con tu lista de productos y el total ya escritos en
            el mensaje.
          </p>
        </>
      )}
    </div>
  );
}
