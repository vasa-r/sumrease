import React from "react";
import BgGradient from "./bg-gradient";
import { ArrowRight, Feather, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FreeUserUi = () => {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center max-w-2xl gap-8 mx-auto text-center">
          <div className="flex items-center gap-2 text-rose-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Premium Feature
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent to-gray-600 bg-linear-to-r from-gray-900 bg-clip-text">
            Subscription Required
          </h1>
          <p className="inline-flex p-6 text-lg leading-8 text-gray-600 border-2 rounded-lg border-rose-200 bg-white/50 backdrop-blur-sm">
            You need to upgrade to the Basic Plan or Pro Plan to access this
            feature <Feather className="ml-1.5 w-5 h-5 text-rose-500" />
          </p>
          <Button
            asChild
            className="text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800"
          >
            <Link href={"/#pricing"} className="flex items-center gap-2">
              View Pricing Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeUserUi;
