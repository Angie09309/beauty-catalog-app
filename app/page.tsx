"use client";
import { Fragment, useEffect, useState } from "react";

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

  const [currentPage, setCurrentPage] = useState(1);

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
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productType?.toLowerCase().includes(searchTerm.toLowerCase());

    return cumpleMarca && cumpleCategoria && cumpleBusqueda;
  });

  const productsPerPage = 20;
  const productosVisibles = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const resultado = filteredProducts.length / productsPerPage;
  const totalPages = Math.ceil(resultado);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

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

  function obtenerPaginasVisibles() {
    const lista = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1
      ) {
        lista.push(i);
      }
    }

    return lista;
  }

  const paginasVisibles = obtenerPaginasVisibles();

  const botones = paginasVisibles.map((item, index) => {
    const siguiente = paginasVisibles[index + 1];

    return (
      <Fragment key={item}>
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-2xl transition-colors ${
            item === currentPage
              ? "bg-primary text-white shadow-lg"
              : "text-gray-400 hover:text-primary hover:bg-gray-100"
          }`}
          onClick={() => {
            setCurrentPage(item);
          }}
        >
          {item}
        </button>

        {siguiente - item > 1 && (
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
            className="lucide lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        )}
      </Fragment>
    );
  });

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
                setCurrentPage(1);
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
        <BrandFilter
          selectedBrand={itemBrand}
          onSelectBrand={(marca) => {
            setItemBrand(marca);
            setCurrentPage(1);
          }}
        />

        <h2 className="text-xl font-semibold mt-8 mb-4">Catálogo</h2>

        {loading && <p>Cargando productos...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && itemList.length === 0 && (
          <p>No encontramos productos</p>
        )}

        {!loading &&
          !error &&
          itemList.length > 0 &&
          filteredProducts.length === 0 && (
            <p>No encontramos productos que coincidan con tu búsqueda.</p>
          )}

        {!loading && !error && itemList.length > 0 && (
          <ProductGrid
            makeup={productosVisibles}
            alHacerClicEnAgregar={handleAddToCart}
          />
        )}

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
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
              className="lucide lucide-chevron-left w-10
            h-10"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-2">
            {botones}
          </div>

          <button
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
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
              className="lucide lucide-chevron-right w-10
            h-10"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

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
