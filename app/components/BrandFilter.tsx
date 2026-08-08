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
          className={`px-4 py-2 rounded-full font-medium transition-colors cursor-pointer 
            ${
              selectedBrand === marcaItem
                ? "bg-primary text-white border-2 hover:border-brand-border border-primary "
                : "bg-card text-text-main border-2 hover:border-brand-border border-primary  hover:bg-brand-border"
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
