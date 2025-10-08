import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  imageAlt,
  imageUrl,
  buttonText,
  option,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card className="group relative flex h-full w-full max-w-xs overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_28px_70px_-48px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-48px_rgba(15,23,42,0.4)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="relative flex h-full flex-col items-center justify-center gap-8 py-12 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-white group-hover:ring-slate-300">
          <Image
            src={imageUrl}
            fill
            alt={imageAlt}
            className="object-contain drop-shadow-md"
            sizes="96px"
          />
        </div>

        <Button
          variant="secondary"
          className="rounded-full px-6 py-2 text-sm font-semibold shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white"
          asChild
        >
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
