import { cn } from "@/lib/utils";
import { pricingPlans, type Pricing } from "@/utils/pricing-plan";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const PriceSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="max-w-5xl px-4 py-12 mx-auto lg:py-24 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="mb-8 text-xl font-bold uppercase text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {pricingPlans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  id,
  name,
  description,
  items,
  price,
  paymentLink,
}: Pricing) => {
  return (
    <div className="relative w-full max-w-lg duration-300 hover:scale-105 hover:transition-all">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold capitalize lg:text-xl">{name}</p>
            <p className="mt-2 text-base-content/80">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">$ {price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs font-semibold uppercase">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="flex justify-center w-full space-y-2">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
