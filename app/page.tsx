"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { ProductGrid } from "./components/ProductGrid";
import BrandFilter from "./components/BrandFilter";
import PromoBanner from "./components/PromoBanner";
import Header from "./components/Header";
import Cart from "./components/Cart";

import { CartItem, infoProduct } from "./types/index";
import { getProducts } from "./services/productService";

export default function Home() {
  // ==========================================
  // 1. ESTADOS
  // ==========================================

  // Productos
  const [itemList, setItemList] = useState<infoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros y búsqueda
  const [itemBrand, setItemBrand] = useState("Todas");
  const [itemCategory, setItemCategory] = useState<Category>("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  // Favoritos
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const favoritos = useRef<HTMLHeadingElement | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Carrito
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mensaje de confirmación
  const [toastMessage, setToastMessage] = useState("");

  // ==========================================
  // 2. CONFIGURACIÓN DE CATEGORÍAS
  // ==========================================

  const categoryGroups = {
    Labios: ["lipstick", "lip_liner"],
    Ojos: ["eyeliner", "mascara"],
    Rostro: ["foundation"],
    Uñas: ["nail_polish"],
  };

  type Category = "Todas" | keyof typeof categoryGroups;

  const categoryImages = {
    Todas: "/categorias/todas.png",
    Labios: "/categorias/labios.png",
    Ojos: "/categorias/ojos.png",
    Rostro: "/categorias/rostro.png",
    Uñas: "/categorias/unas.png",
  };

  const categories: Category[] = [
    "Todas",
    ...(Object.keys(categoryGroups) as Array<keyof typeof categoryGroups>),
  ];

  // ==========================================
  // 3. CARGAR PRODUCTOS
  // ==========================================

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

  // ==========================================
  // 4. FILTRAR PRODUCTOS
  // ==========================================

  const filteredProducts = itemList.filter((item) => {
    const cumpleMarca =
      itemBrand === "Todas" ||
      item.brand?.toLowerCase() === itemBrand.toLowerCase();

    const cumpleCategoria =
      itemCategory === "Todas"
        ? true
        : categoryGroups[itemCategory].includes(item.productType);

    const cumpleBusqueda =
      searchTerm.length === 0 ||
      item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productType?.toLowerCase().includes(searchTerm.toLowerCase());

    return cumpleMarca && cumpleCategoria && cumpleBusqueda;
  });

  // ==========================================
  // 5. FAVORITOS Y LISTA ACTUAL
  // ==========================================

  const productosFavoritos = itemList.filter((producto) => {
    return favoriteIds.includes(producto.id);
  });

  // Elegimos qué productos mostrar según la vista activa.
  const productosBase = mostrarFavoritos
    ? productosFavoritos
    : filteredProducts;

  // ==========================================
  // 6. PAGINACIÓN
  // ==========================================

  const productosVisibles = productosBase.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const totalPages = Math.ceil(productosBase.length / productsPerPage);

  // Si la página actual deja de existir, volvemos a la primera.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  function obtenerPaginasVisibles() {
    const lista: number[] = [];

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
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </button>

        {siguiente !== undefined && siguiente - item > 1 && (
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

  // ==========================================
  // 7. MARCAS
  // ==========================================

  const getBrands = () => {
    return itemList.map((producto) => producto.brand);
  };

  const brandSet = new Set(getBrands());
  const brand = [...brandSet];

  // ==========================================
  // 8. FUNCIONES DE FAVORITOS
  // ==========================================

  function toggleFavorite(productId: string) {
    if (favoriteIds.includes(productId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== productId));
    } else {
      setFavoriteIds([...favoriteIds, productId]);
    }
  }

  function alternarFavoritos() {
    setMostrarFavoritos((actual) => !actual);
    setCurrentPage(1);
  }

  function volverAlCatalogo() {
    setMostrarFavoritos(false);
    setCurrentPage(1);
  }

  // Desplazarnos hasta el título cuando abrimos favoritos.
  useEffect(() => {
    if (mostrarFavoritos) {
      favoritos.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [mostrarFavoritos]);

  // ==========================================
  // 9. FUNCIONES DEL CARRITO
  // ==========================================

  function handleAddToCart(productoCarrito: infoProduct) {
    const existe = cartList.some((item) => item.id === productoCarrito.id);

    if (existe) {
      setCartList(
        cartList.map((item) => {
          if (item.id === productoCarrito.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        }),
      );
    } else {
      setCartList([...cartList, { ...productoCarrito, quantity: 1 }]);
    }

    setToastMessage(`¡Agregaste ${productoCarrito.name} al carrito!`);

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
        }

        return item;
      }),
    );
  }

  function handleRemoveItem(id: string) {
    setCartList(cartList.filter((item) => item.id !== id));
  }

  function onOpenCart() {
    setIsCartOpen(true);
  }

  function onCloseCart() {
    setIsCartOpen(false);
  }

  const totalCartCount = cartList.reduce(
    (acumulador, item) => acumulador + item.quantity,
    0,
  );

  // ==========================================
  // 10. INTERFAZ
  // ==========================================

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCartHeader={onOpenCart}
        cartCount={totalCartCount}
        onToggleFavorites={alternarFavoritos}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner />

        {/* Categorías */}
        <div className="flex flex-wrap justify-center gap-6 bg-background text-foreground">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setItemCategory(category);
                setCurrentPage(1);
              }}
              className={`flex flex-col items-center rounded-md border-0 p-4 w-56 shrink-0 hover:border-brand-border transition-colors cursor-pointer ${
                itemCategory === category
                  ? "bg-card text-foreground"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <img
                className="w-full h-56 object-cover"
                src={categoryImages[category]}
                alt={category}
              />

              <span
                className={`mt-4 ${
                  itemCategory === category
                    ? "border-b-2 border-accent"
                    : "border-none"
                }`}
              >
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Marcas */}
        <h2 className="text-2xl font-serif font-medium mt-12 mb-6">
          Marcas destacadas
        </h2>

        <BrandFilter
          brand={brand}
          selectedBrand={itemBrand}
          onSelectBrand={(marca) => {
            setItemBrand(marca);
            setCurrentPage(1);
          }}
        />

        {/* Título de la vista actual */}
        <div className="flex items-center justify-between mt-12 mb-6">
          <h2
            ref={favoritos}
            className="text-2xl font-serif font-medium mt-12 mb-6"
          >
            {mostrarFavoritos ? "Mis favoritos" : "Catálogo"}
          </h2>

          {mostrarFavoritos && (
            <button
              onClick={volverAlCatalogo}
              aria-label="Volver al catálogo"
              className="rounded-full p-2 hover:bg-secondary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x preview-icon w-7 h-7"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Estados de carga y error */}
        {loading && (
          <p className="text-center text-muted-foreground py-12 text-base">
            Cargando productos...
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-muted-foreground py-12 text-base">
            {error}
          </p>
        )}

        {!loading && !error && itemList.length === 0 && (
          <p>No encontramos productos</p>
        )}

        {/* Sin resultados en el catálogo */}
        {!loading &&
          !error &&
          itemList.length > 0 &&
          filteredProducts.length === 0 &&
          !mostrarFavoritos && (
            <p className="text-center text-muted-foreground py-12 text-base">
              No encontramos productos que coincidan con tu búsqueda.
            </p>
          )}

        {/* Sin favoritos */}
        {mostrarFavoritos && productosFavoritos.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-16 w-16 text-destructive opacity-70"
            >
              <path d="M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15" />
              <path d="M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z" />
            </svg>

            <h2 className="font-serif text-2xl text-foreground">
              Aún no tienes favoritos
            </h2>
          </div>
        )}

        {/* Productos de la vista actual */}
        {!loading && !error && itemList.length > 0 && (
          <ProductGrid
            favorite={favoriteIds}
            makeup={productosVisibles}
            alHacerClicEnAgregar={handleAddToCart}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* Controles de paginación */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center gap-4">
            <button
              aria-label="Página anterior"
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((pagina) => pagina - 1);
              }}
              className="disabled:opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left w-10 h-10"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center justify-center gap-2">
              {botones}
            </div>

            <button
              aria-label="Página siguiente"
              disabled={currentPage >= totalPages}
              onClick={() => {
                setCurrentPage((pagina) => pagina + 1);
              }}
              className="disabled:opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-10 h-10"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Botón flotante del carrito */}
        <button
          aria-label="Abrir carrito"
          className="fixed bottom-5 right-10 z-40 w-12 h-12 flex items-center justify-center bg-primary text-white shadow-xl rounded-full"
          onClick={onOpenCart}
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
            <span className="absolute -top-1 -right-1 rounded-full w-5 h-5 bg-text-muted text-white flex items-center justify-center text-xs border border-white shadow-sm">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* Mensaje al agregar un producto */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-4 py-3 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        )}

        {/* Carrito lateral */}
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
