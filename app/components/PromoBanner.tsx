export default function PromoBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-5rem)] ">
      <div className="flex flex-col gap-10 justify-center items-start h-full ">
        <span className="text-xs tracking-[0.25em] text-muted-foreground ">
          EL EDIT DE MAISON
        </span>

        <h1 className="font-display text-5xl md:text-7xl font-normal leading-[0.9] max-w-full">
          Belleza, siempre{" "}
          <span className="text-accent italic">íntima y personal.</span>
        </h1>

        <p className="text-muted-foreground ">
          Una selección de maquillaje y esenciales —skincare, maquillaje y
          rituales— elegidos por cómo se sienten en la piel, no por lo que
          prometen.
        </p>

        <div className="flex gap-10 text-muted-foreground">
          <button className="text-sm tracking-widest bg-primary text-primary-foreground transition-colors hover:bg-secondary-foreground px-8 py-4">
            COMPRAR LA EDICION
          </button>
          <button className="text-muted-foreground hover:text-foreground text-sm tracking-widest ">
            DESCUBRIR MAISON
          </button>
        </div>
      </div>

      <div className="relative w-full h-full py-9">
        <img
          src="/img/hero.jpg"
          alt="hero"
          className="w-full h-full object-cover "
        />

        <div className="absolute bottom-14 left-6 bg-muted px-5 py-5">
          <h2 className="text-ms tracking-[0.2em] text-muted-foreground   ">
            RITUAL DESTACADO
          </h2>
          <span className="inline-block mt-2 font-display text-lg ">
            El reset nocturno en tres pasos
          </span>
        </div>
      </div>
    </div>
  );
}
