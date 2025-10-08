"use client";

import { Prisma } from "@prisma/client";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import Products from "./products";

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

export const RestaurantCategories = ({
  restaurant,
}: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    MenuCategoriesWithProducts | undefined
  >(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (
    category: MenuCategoriesWithProducts,
  ): ButtonProps["variant"] =>
    selectedCategory?.id === category.id ? "default" : "secondary";

  const isCategorySelected = (category: MenuCategoriesWithProducts) =>
    selectedCategory?.id === category.id;

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border border-slate-200 bg-white px-5 pb-6 pt-6 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.7)]">
      <div className="flex items-start gap-3">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          height={56}
          width={56}
          className="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover shadow-sm"
        />

        <div className="flex flex-1 flex-col gap-1.5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {restaurant.name}
            </h2>
            <p className="text-sm text-slate-400">{restaurant.description}</p>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Clock className="h-4 w-4" />
            <span>Aberto!</span>
          </div>
        </div>
      </div>

      <ScrollArea className="mt-4 w-full">
        <div className="flex w-max items-center gap-3 pb-1">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className={cn(
                "rounded-full border-none px-5 py-2 text-sm font-semibold transition-colors",
                isCategorySelected(category)
                  ? "bg-[#F79F1F] text-white hover:bg-[#f79f1f]"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>

      <div className="mt-8 w-full border-t border-slate-200 pt-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {selectedCategory?.name}
        </h3>
      </div>

      <div className="mt-4">
        <Products products={selectedCategory?.products} />
      </div>
    </div>
  );
};
