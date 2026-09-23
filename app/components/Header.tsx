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
          <h1 className="text-3xl text-primary font-normal tracking-[0.18em] font-display">
            MAISON.
          </h1>
        </div>

        <div className="inline-flex items-center gap-5 py-2 border-border border-b w-100 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search-icon lucide-search text-primary w-4 h-4"
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

        <div className="flex items-center gap-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
          </button>

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
              className="lucide lucide-shopping-bag w-5 h-5 text-primary"
            >
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
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
