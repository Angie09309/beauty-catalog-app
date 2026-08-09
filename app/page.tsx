"use client";
import { useState } from "react";

import { ProductGrid } from "./components/ProductGrid";
import { PRODUCTS } from "./data/products";
import BrandFilter from "./components/BrandFilter";
import PromoBanner from "./components/PromoBanner";
import Header from "./components/Header";

export default function Home() {
  const [itemBrand, setItemBrand] = useState("Todas");

  const filteredProducts =
    itemBrand === "Todas"
      ? PRODUCTS
      : PRODUCTS.filter((productos) => productos.brand === itemBrand);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner />

        <h2 className="text-xl font-semibold my-4">Marcas destacadas</h2>
        <BrandFilter selectedBrand={itemBrand} onSelectBrand={setItemBrand} />

        <h2 className="text-xl font-semibold mt-8 mb-4">Catálogo</h2>
        <ProductGrid makeup={filteredProducts} />
      </main>
    </>
  );
}
