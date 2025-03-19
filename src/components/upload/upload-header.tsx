import { Sparkles, WandSparkles } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="w-fit">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 font-medium bg-secondary rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles
              style={{ width: "24px", height: "24px" }}
              className="text-rose-600 animate-pulse mr-2"
            />
            <p className="text-base text-rose-600">
              AI powered content creation
            </p>
          </Badge>
        </div>
      </div>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <h1>
          Start Uploading <span className="text-primary">your PDF&apos;s</span>
        </h1>
      </div>{" "}
      <div className="flex gap-2 mt-2 text-lg leading-8 text-gray-600 max-w-2xl">
        <p> Upload your PDF and let our AI do the magic </p> <WandSparkles />
      </div>
    </div>
  );
};

export default UploadHeader;
