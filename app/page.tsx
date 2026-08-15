"use client";
import { useState } from "react";

import { ProductGrid } from "./components/ProductGrid";
import { PRODUCTS } from "./data/products";
import BrandFilter from "./components/BrandFilter";
import PromoBanner from "./components/PromoBanner";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { CartItem, infoProduct } from "./types/index";

export default function Home() {
  const [itemBrand, setItemBrand] = useState("Todas");

  const filteredProducts =
    itemBrand === "Todas"
      ? PRODUCTS
      : PRODUCTS.filter((productos) => productos.brand === itemBrand);

  const [cartList, setCartList] = useState<CartItem[]>([]);

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

  return (
    <>
      <Header onOpenCartHeader={onOpenCart} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner />

        <h2 className="text-xl font-semibold my-4">Marcas destacadas</h2>
        <BrandFilter selectedBrand={itemBrand} onSelectBrand={setItemBrand} />

        <h2 className="text-xl font-semibold mt-8 mb-4">Catálogo</h2>
        <ProductGrid
          makeup={filteredProducts}
          alHacerClicEnAgregar={handleAddToCart}
        />

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
