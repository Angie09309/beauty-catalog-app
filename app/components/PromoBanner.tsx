export default function PromoBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-0 md:min-h-[calc(100vh-5rem)]">
      <div className="flex flex-col gap-5 md:gap-10 justify-center items-start py-10 md:py-0 h-full">
        <span className="text-xs tracking-[0.25em] text-muted-foreground ">
          EL EDIT DE MAISON
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-normal leading-none md:leading-[0.9] max-w-full">
          Belleza, siempre{" "}
          <span className="text-accent italic">íntima y personal.</span>
        </h1>

        <p className="text-muted-foreground ">
          Una selección de maquillaje y esenciales —skincare, maquillaje y
          rituales— elegidos por cómo se sienten en la piel, no por lo que
          prometen.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-6 text-muted-foreground">
          <button className="text-xs sm:text-sm tracking-widest bg-primary text-primary-foreground transition-colors hover:bg-secondary-foreground px-4 sm:px-8 py-3 sm:py-4">
            COMPRAR LA EDICION
          </button>
          <button className="text-muted-foreground hover:text-foreground text-sm tracking-widest ">
            DESCUBRIR MAISON
          </button>
        </div>
      </div>

      <div className="relative w-full min-w-0 h-auto md:h-[calc(100vh-5rem)]">
        <img
          src="/img/hero.jpg"
          alt="hero"
          className="block w-full h-auto max-h-130 object-contain md:h-full md:max-h-none md:object-contain"
        />

        <div className="absolute bottom-6 md:bottom-14 left-4 md:left-6 bg-muted px-4 md:px-5 py-4 md:py-5">
          <h2 className="text-ms tracking-[0.2em] text-muted-foreground">
            RITUAL DESTACADO
          </h2>
          <span className="inline-block mt-2 font-display text-lg">
            El reset nocturno en tres pasos
          </span>
        </div>
      </div>
    </div>
  );
}
