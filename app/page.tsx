"use client";
import { useEffect, useState } from "react";

import { ProductGrid } from "./components/ProductGrid";
import { PRODUCTS } from "./data/products";
import BrandFilter from "./components/BrandFilter";
import PromoBanner from "./components/PromoBanner";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { CartItem, infoProduct } from "./types/index";

import { getProducts } from "./services/productService";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [itemList, setItemList] = useState<infoProduct[]>([]);

  useEffect(() => {
    getProducts()
      .then((productos) => {
        setItemList(productos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("No se pudieron obtener los productos", err);
        setError("No pudimos cargar los productos");
        setLoading(false);
      });
  }, []);

  const [itemBrand, setItemBrand] = useState("Todas");
  const [itemCategory, setItemCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = itemList.filter((item) => {
    const cumpleMarca =
      itemBrand === "Todas" ||
      item.brand?.toLowerCase() === itemBrand.toLowerCase();

    const cumpleCategoria =
      itemCategory === "Todas" ||
      item.productType.toLowerCase() === itemCategory.toLowerCase();

    const cumpleBusqueda =
      searchTerm.length === 0
        ? true
        : item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return cumpleMarca && cumpleCategoria && cumpleBusqueda;
  });

  const categories = [
    "Todas",
    ...Array.from(new Set(itemList.map((item) => item.productType))),
  ];

  const [cartList, setCartList] = useState<CartItem[]>([]);

  const [toastMessage, setToastMessage] = useState("");

  function handleAddToCart(ProductCart: infoProduct) {
    const existe = cartList.some((item) => item.id === ProductCart.id);

    if (existe) {
      setCartList(
        cartList.map((item) => {
          if (item.id === ProductCart.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        }),
      );
    } else {
      setCartList([...cartList, { ...ProductCart, quantity: 1 }]);
    }

    setToastMessage(`¡Agregaste ${ProductCart.name} al carrito!`);

    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  }

  function handleUpdateQuantity(id: string, newQuantity: number) {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartList(
      cartList.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      }),
    );
  }

  function handleRemoveItem(id: string) {
    setCartList(cartList.filter((item) => item.id !== id));
  }

  const [isCartOpen, setIsCartOpen] = useState(false);

  function onOpenCart() {
    setIsCartOpen(true);
  }

  function onCloseCart() {
    setIsCartOpen(false);
  }

  const totalCartCount = cartList.reduce((acumulador, item) => {
    return acumulador + item.quantity;
  }, 0);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCartHeader={onOpenCart}
        cartCount={totalCartCount}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner />

        <div className="flex flex-wrap gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setItemCategory(category);
              }}
              className={`rounded-full border-2 border-primary p-4 hover:border-brand-border transition-colors cursor-pointer 
            ${
              itemCategory === category
                ? "bg-primary text-white hover:border-brand-border "
                : "bg-card text-text-main  hover:border-brand-border hover:bg-brand-border "
            }
            `}
            >
              {category}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold my-4">Marcas destacadas</h2>
        <BrandFilter selectedBrand={itemBrand} onSelectBrand={setItemBrand} />

        <h2 className="text-xl font-semibold mt-8 mb-4">Catálogo</h2>

        {loading && <p>Cargando productos...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && itemList.length === 0 && (
          <p>No encontramos productos</p>
        )}

        {!loading && !error && itemList.length > 0 && (
          <ProductGrid
            makeup={filteredProducts}
            alHacerClicEnAgregar={handleAddToCart}
          />
        )}

        <button
          className=" fixed bottom-5 right-10 z-40 w-12 h-12 flex items-center justify-center bg-primary text-white shadow-xl rounded-full"
          onClick={() => {
            onOpenCart();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-bag-icon lucide-shopping-bag w-7 h-7 text-white"
          >
            <path d="M16 10a4 4 0 0 1-8 0" />
            <path d="M3.103 6.034h17.794" />
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
          </svg>

          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 rounded-full w-5 h-5  bg-text-muted text-white flex items-center justify-center text-xs border border-white shadow-sm ">
              {totalCartCount}
            </span>
          )}
        </button>
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-4 py-3 rounded-lg shadow-lg ">
            {toastMessage}
          </div>
        )}

        <Cart
          isCartOpen={isCartOpen}
          cartItems={cartList}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCloseCartX={onCloseCart}
        />
      </main>
    </>
  );
}
