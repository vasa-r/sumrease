import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="text-rose-500 w-6 h-6 animate-spin" />
    </div>
  );
};

export default LoadingSkeleton;
