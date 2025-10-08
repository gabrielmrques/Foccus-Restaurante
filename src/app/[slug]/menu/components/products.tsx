import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export type ProductsProps = {
  products?: Product[];
};

export default function Products({ products }: ProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href="#"
          className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.5)] transition hover:border-slate-300"
        >
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">
              {product.name}
            </h3>
            <p
              className="mt-1 text-sm text-slate-500"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {product.description}
            </p>
            <p className="mt-3 text-sm font-semibold text-emerald-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>

          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
