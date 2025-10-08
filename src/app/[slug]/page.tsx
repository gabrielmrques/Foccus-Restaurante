import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./consumption-method-option";

interface RestaurantPageProps {
  params: { slug: string };
}

const extractBrandColor = (restaurant: object) => {
  const candidate =
    (restaurant as { primaryColor?: string }).primaryColor ??
    (restaurant as { accentColor?: string }).accentColor ??
    (restaurant as { themeColor?: string }).themeColor ??
    (restaurant as { brandColor?: string }).brandColor;

  if (candidate && /^#([0-9A-F]{3}){1,2}$/i.test(candidate)) {
    return candidate;
  }

  return "#FACC15";
};

const lightenHex = (hex: string, ratio = 0.25) => {
  const sanitized = hex.replace("#", "");
  if (!/^([0-9A-F]{3}){1,2}$/i.test(sanitized)) return hex;

  const expanded = sanitized.length === 3 ? sanitized.repeat(2) : sanitized;

  const channels = [0, 2, 4].map((index) => {
    const channel = parseInt(expanded.slice(index, index + 2), 16);
    return Math.min(255, Math.round(channel + (255 - channel) * ratio));
  });

  const [r, g, b] = channels;
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant) return notFound();

  const brandColor = extractBrandColor(restaurant);
  const brandTint = lightenHex(brandColor, 0.25);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 pb-16 pt-20 text-slate-900">
      <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full shadow-[0_28px_60px_-28px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1"
          style={{ backgroundColor: brandTint }}
        >
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={92}
            height={92}
            className="h-24 w-24 rounded-full border-[3px] border-white object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {restaurant.name}
          </h1>
          <p className="max-w-lg text-base text-slate-600">
            Receba nossa equipe para transformar o seu momento em uma ocasiao
            especial, com o melhor da nossa cozinha.
          </p>
        </div>
      </div>

      <div className="mt-14 flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Como podemos receber voce hoje?
        </h2>
        <p className="max-w-md text-base text-slate-500">
          Escolha a melhor forma de aproveitar o seu pedido e deixe o restante
          com a nossa equipe.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-3xl gap-6 sm:grid-cols-2 sm:place-items-center">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/takeaway.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
