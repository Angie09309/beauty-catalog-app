import ProductCard from "@/app/components/ProductCard";

export default function Home() {
  const sampleProduct = {
    id: "val-001",
    name: "Labial líquido mate Velvet",
    brand: "Trendy",
    category: "Maquillaje",
    price: 32000,
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=500&auto=format&fit=crop",
    description: "Labial mate de alta pigmentación.",
  };

  return (
    <main>
      <ProductCard product={sampleProduct} />
    </main>
  );
}
