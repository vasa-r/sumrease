import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptySummaryState = () => {
  return (
    <div className="text-center py-12">
      <div>
        <div className="flex flex-col items-center gap-4">
          <FileText className="w-16 h-16 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-400">
            No summaries yet
          </h2>
          <p className="text-gray-500 max-w-md">
            Upload your first PDF to get started.
          </p>

          <Link href={"/upload"}>
            <Button className="text-white mt-4 bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-500 hover:scale-105 transition-all duration-300">
              Create your first summary
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptySummaryState;
