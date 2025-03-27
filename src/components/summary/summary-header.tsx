import React from "react";
import { PdfSummary } from "../../../types/type";
import { Button } from "../ui/button";
import Link from "next/link";
import { Calendar, ChevronLeft, Clock2, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

const SummaryHeader = ({
  title,
  created_at,
  word_count,
}: Partial<PdfSummary>) => {
  const readingTime = Math.ceil((word_count || 0) / 200);
  return (
    <div className="flex gap-4 mb-4 justify-between ">
      <div className="space-y-6">
        <div className="flex items-center flex-wrap gap-4">
          <Badge
            variant="secondary"
            className="relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-200 shadow-xs hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-rose-500" /> AI Summary
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-rose-400" />
            {new Date(created_at!).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock2 className="w-4 h-4 text-rose-400" />
            {readingTime} min Read
          </div>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div className="self-start">
        <Link href="/dashboard">
          <Button
            variant="link"
            size="sm"
            className="group hover:no-underline flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:translate-x-0.5" />{" "}
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Back <span className="hidden sm:inline">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryHeader;
