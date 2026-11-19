export default function PromoBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-0 md:min-h-[calc(100vh-5rem)] gap-8 md:gap-6">
      <div className="flex flex-col gap-5 md:gap-10 justify-center items-start py-8 sm:py-10 md:py-0 h-full">
        <span className="text-xs tracking-[0.25em] text-muted-foreground ">
          EL EDIT DE MAISON
        </span>

        <h1 className="max-w-xl font-display text-4xl sm:text-5xl md:text-7xl font-normal leading-[1.05] md:leading-[0.9]">
          Belleza, siempre{" "}
          <span className="text-accent italic">íntima y personal.</span>
        </h1>

        <p className="max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
          Una selección de maquillaje y esenciales —skincare, maquillaje y
          rituales— elegidos por cómo se sienten en la piel, no por lo que
          prometen.
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground">
          <button className="bg-primary text-primary-foreground text-[11px] sm:text-sm tracking-widest px-5 sm:px-8 py-3 sm:py-4 transition-colors hover:bg-secondary-foreground">
            COMPRAR LA EDICIÓN
          </button>

          <button className="text-xs sm:text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            DESCUBRIR MAISON
          </button>
        </div>
      </div>

      <div className="relative w-full min-w-0 mt-6 sm:mt-8 md:mt-10 lg:mt-12 md:h-[calc(100vh-9rem)]">
        <img
          src="/img/hero.jpg"
          alt="hero"
          className="block w-full h-auto md:h-full md:object-cover"
        />
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-14 left-4 md:left-6 bg-muted px-4 md:px-5 py-4 md:py-5">
          <h2 className="text-xs tracking-[0.2em] text-muted-foreground">
            RITUAL DESTACADO
          </h2>
          <span className="inline-block mt-2 font-display text-sm">
            El reset nocturno en tres pasos
          </span>
        </div>
      </div>
    </div>
  );
}
