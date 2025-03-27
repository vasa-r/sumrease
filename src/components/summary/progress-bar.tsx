import { cn } from "@/lib/utils";
import React from "react";

interface ProgProp {
  sections: {
    title: string;
    points: string[];
  }[];
  currentSection: number;
}

const ProgressBar = ({ sections, currentSection }: ProgProp) => {
  return (
    <div className="absolute top-0 right-0 left-0 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
      <div className="px-4 flex gap-1.5">
        {sections.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden"
          >
            <div
              className={cn(
                "h-full bg-linear-to-r from-gray-500 to-rose-600 transition-all duration-500",
                idx === currentSection
                  ? "w-full"
                  : currentSection > idx
                  ? "w-full opacity-10"
                  : "w-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
