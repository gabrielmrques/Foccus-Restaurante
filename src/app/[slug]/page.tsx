import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./consumption-method-option";

interface RestaurantPageProps {
  params: { slug: string };
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant) return notFound();

  return (
    <div className="flex min-h-screen flex-col items-center px-5 pt-24">
      {/* Restaurant Logo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
          className="rounded-full shadow-md"
        />
        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
      </div>

      {/* Seja bem-vindo */}
      <div className="max-w-xl space-y-2 pt-16 text-center">
        <h3 className="animate-float text-2xl font-semibold">
          Seja bem-vindo!
        </h3>
        <p className="animate-float-slow opacity-80">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe.
        </p>
      </div>

      {/* Opções */}
      <div className="flex w-full max-w-3xl justify-center gap-6 pt-14">
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
          imageUrl="/takeway.png "
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
