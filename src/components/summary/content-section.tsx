import React from "react";
import { MotionDiv } from "@/components/common/motion-wrapper";

// const parsePoint = (point: string) => {
//   const isNumbered = /^\d+\./.test(point);
//   const isMainPoint = /^+/.test(point);
// };

const ContentSection = ({ points }: { title: string; points: string[] }) => {
  return (
    <div className="space-y-4">
      {points.map((point, idx) => {
        return (
          <MotionDiv
            initial={{ opacity: 0, y: idx % 2 === 0 ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            key={idx}
            className="p-4 bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] rounded-xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
              {point.substring(1)}
            </p>
          </MotionDiv>
        );
      })}
    </div>
  );
};

export default ContentSection;
