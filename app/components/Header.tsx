export default function Header() {
  return (
    <header className="w-full border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        <div className="">
          <h1 className="text-3xl text-primary font-bold">Valushy</h1>
          <span className="uppercase tracking-widest text-xs">
            Belleza & cuidado
          </span>
        </div>

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
          />
        </div>
      </div>
    </header>
  );
}
