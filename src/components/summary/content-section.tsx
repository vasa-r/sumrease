import React from "react";

// const parsePoint = (point: string) => {
//   const isNumbered = /^\d+\./.test(point);
//   const isMainPoint = /^+/.test(point);
// };

const ContentSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <div className="space-y-4">
      {points.map((point, idx) => {
        return (
          <div
            key={idx}
            className="p-4 bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] rounded-xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
              {point.substring(1)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ContentSection;
