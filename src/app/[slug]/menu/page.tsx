import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod?: string }>;
}

const isConsumptionMethodValid = (consumptionMethod?: string) => {
  if (!consumptionMethod) return false;
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }

  return (
    <h1>
      MENU {slug} - {consumptionMethod}
    </h1>
  );
};

export default RestaurantMenuPage;
