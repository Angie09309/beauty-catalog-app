import { useState } from "react";

export interface BrandFilterProps {
  selectedBrand: string;
  brand: string[];
  onSelectBrand: (chosenBrand: string) => void;
}

export default function BrandFilter({
  selectedBrand,
  onSelectBrand,
  brand,
}: BrandFilterProps) {
  const [currentBrandPage, setCurrentBrandPage] = useState(0);

  const start = currentBrandPage * 8;
  const visibleBrands = brand.slice(start, start + 8);
  const totalBrandPages = Math.ceil(brand.length / 8);

  const allBrands = ["Todas", ...visibleBrands];

  return (
    <div className="flex gap-2 justify-start my-6 overflow-x-auto scrollbar-hide cursor-grab">
      <button
        className="p-2 text-muted-foreground transition-colors cursor-pointer hover:text-foreground disabled:opacity-40"
        disabled={currentBrandPage === 0}
        onClick={() => {
          if (currentBrandPage > 0) {
            setCurrentBrandPage(currentBrandPage - 1);
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
          className="lucide lucide-chevron-left preview-icon h-6 w-6"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      {allBrands.map((marcaItem) => (
        <button
          className={`px-4 py-2 font-medium transition-colors cursor-pointer text-sm tracking-widest
            ${
              selectedBrand === marcaItem
                ? "border-b-2 border-accent hover:text-secondary-foreground"
                : "text-muted-foreground hover:text-secondary-foreground border-b-2 border-transparent"
            }`}
          key={marcaItem}
          onClick={() => onSelectBrand(marcaItem)}
        >
          {marcaItem}
        </button>
      ))}
      <button
        className="p-2 text-muted-foreground transition-colors cursor-pointer hover:text-foreground disabled:opacity-40"
        disabled={!(currentBrandPage < totalBrandPages - 1)}
        onClick={() => {
          if (currentBrandPage < totalBrandPages - 1) {
            setCurrentBrandPage(currentBrandPage + 1);
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
          className="lucide lucide-chevron-right preview-icon h-6 w-6"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
