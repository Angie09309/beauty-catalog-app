import { BRANDS } from "../data/products";

export interface BrandFilterProps {
  selectedBrand: string;
  onSelectBrand: (chosenBrand: string) => void;
}

export default function BrandFilter({
  selectedBrand,
  onSelectBrand,
}: BrandFilterProps) {
  const allCategories = ["Todas", ...BRANDS];

  return (
    <div className=" flex flex-wrap gap-2 justify-center my-6">
      {allCategories.map((marcaItem) => (
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors cursor-pointer  border-2 border-primary
            ${
              selectedBrand === marcaItem
                ? "bg-primary text-white hover:border-brand-border  "
                : "bg-card text-text-main hover:border-brand-border  hover:bg-brand-border"
            }`}
          key={marcaItem}
          onClick={() => onSelectBrand(marcaItem)}
        >
          {marcaItem}
        </button>
      ))}
    </div>
  );
}
