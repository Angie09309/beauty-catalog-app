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

  const totalBrandPages = Math.ceil(brand.length / 8);
  const extraBrands = brand.length % 8;
  const brandsPerPage = Math.floor(brand.length / totalBrandPages);

  const start =
    currentBrandPage * brandsPerPage + Math.min(currentBrandPage, extraBrands);

  const pageSize =
    currentBrandPage < extraBrands ? brandsPerPage + 1 : brandsPerPage;

  const visibleBrands = brand.slice(start, pageSize + start);

  const allBrands = ["Todas", ...visibleBrands];

  return (
    <div className="flex gap-2 justify-start my-6 overflow-x-auto scrollbar-hide cursor-grab w-full">
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

      <div className=" flex flex-1 min-w-0">
        {allBrands.map((marcaItem) => (
          <button
            className={`px-4 py-2 font-medium transition-colors cursor-pointer text-sm tracking-wider shrink-0 flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap uppercase
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
      </div>

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
