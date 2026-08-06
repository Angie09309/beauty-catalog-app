import { Product } from "../types";

export const BRANDS = [
  "Trendy",
  "Atenea",
  "Maybelline",
  "Skala",
  "Ponto",
  "Prosa",
] as const;

export type Brand = (typeof BRANDS)[number];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Labial líquido mate Velvet",
    brand: "Trendy",
    category: "Labios",
    price: 32000,
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop",
    description:
      "Labial líquido de textura suave con acabado mate de larga duración.",
  },
  {
    id: "2",
    name: "Base fluida cobertura natural",
    brand: "Maybelline",
    category: "Rostro",
    price: 68000,
    imageUrl:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop",
    description:
      "Base ligera para un acabado natural y luminoso durante todo el día.",
  },
  {
    id: "3",
    name: "Paleta de sombras Rosé",
    brand: "Atenea",
    category: "Ojos",
    price: 54000,
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop",
    description: "Paleta con tonos cálidos y satinados de alta pigmentación.",
  },
  {
    id: "4",
    name: "Acondicionador reparador",
    brand: "Skala",
    category: "Capilar",
    price: 24500,
    imageUrl:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop",
    description: "Tratamiento intensivo para cabello seco o maltratado.",
  },
  {
    id: "5",
    name: "Labial líquido mate Velvet",
    brand: "Trendy",
    category: "Labios",
    price: 32000,
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop",
    description:
      "Labial líquido de textura suave con acabado mate de larga duración.",
  },
  {
    id: "6",
    name: "Base fluida cobertura natural",
    brand: "Maybelline",
    category: "Rostro",
    price: 68000,
    imageUrl:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop",
    description:
      "Base ligera para un acabado natural y luminoso durante todo el día.",
  },
  {
    id: "7",
    name: "Paleta de sombras Rosé",
    brand: "Atenea",
    category: "Ojos",
    price: 54000,
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop",
    description: "Paleta con tonos cálidos y satinados de alta pigmentación.",
  },
  {
    id: "8",
    name: "Acondicionador reparador",
    brand: "Skala",
    category: "Capilar",
    price: 24500,
    imageUrl:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop",
    description: "Tratamiento intensivo para cabello seco o maltratado.",
  },
  {
    id: "9",
    name: "Labial líquido mate Velvet",
    brand: "Trendy",
    category: "Maquillaje",
    price: 32000,
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=500&auto=format&fit=crop",
    description: "Labial mate de alta pigmentación.",
  },
];
