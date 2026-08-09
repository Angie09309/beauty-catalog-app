export default function PromoBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-accent border-card-border rounded-4xl shadow-2xs my-7 overflow-hidden">
      <div className="p-12 flex flex-col gap-6 justify-center items-start">
        <span className="inline-flex items-center rounded-full bg-card gap-2 p-2 text-sm text-primary-hover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-moon-star-icon lucide-moon-star"
          >
            <path d="M18 5h4" />
            <path d="M20 3v4" />
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
          </svg>
          Nueva colección
        </span>

        <h1 className="text-5xl font-medium">
          Belleza que se siente tan bien como se ve
        </h1>

        <p className="text-text-muted">
          Cosméticos y cuidado personal seleccionados con cariño. Arma tu pedido
          y envíanoslo por WhatsApp.
        </p>
      </div>

      <div className="w-full h-full">
        <img
          src="/img/hero.jpg"
          alt="hero"
          className="  w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
