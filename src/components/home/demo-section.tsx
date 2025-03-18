import { Pizza } from "lucide-react";
import React from "react";

const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath: `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%,32% 57%, 2% 35%,39% 35%)`,
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <h3 className="font-bold text-3xl max-w-3xl mx-auto px-4 sm:px-6">
            Watch how SumrEase transform{" "}
            <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
              this Next.js course PDF
            </span>{" "}
            into an easy-to-read summary
          </h3>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          {/* summary viewer */}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
