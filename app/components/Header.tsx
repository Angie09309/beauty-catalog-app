interface HeaderProp {
  onOpenCartHeader: () => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Header({
  onOpenCartHeader,
  cartCount,
  setSearchTerm,
  searchTerm,
}: HeaderProp) {
  return (
    <header className="w-full border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        <div className="">
          <h1 className="text-3xl text-primary font-bold">Valushy</h1>
          <span className="uppercase tracking-widest text-xs">
            Belleza & cuidado
          </span>
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="rounded-full bg-card inline-flex items-center gap-5 px-5 py-2.5 border border-transparent focus-within:border-primary shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search-icon lucide-search text-primary w-5 h-5"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>

            <input
              className="outline-none w-full bg-transparent"
              type="text"
              placeholder="Buscar marcas o productos"
              aria-label="Buscar marcas o productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              onOpenCartHeader();
            }}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart-icon lucide-shopping-cart w-8 h-8 text-primary"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full w-4.5 h-4.5 bg-card-border flex items-center justify-center text-xs text-text-muted  ">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
