import { getSummary } from "@/lib/summaries";
import { notFound } from "next/navigation";
import React from "react";
import { PdfSummary } from "../../../../../types/type";
import SummaryHeader from "@/components/summary/summary-header";
import SourceInfo from "@/components/summary/source-info";
import { FileText } from "lucide-react";
import SummaryViewer from "@/components/summary/summary-viewer";

interface ISType {
  params: Promise<{ summaryId: string }>;
}

const IndividualSummary = async (props: ISType) => {
  const params = await props.params;
  const summaryId = params.summaryId;

  const summary = (await getSummary(summaryId)) as PdfSummary;

  const {
    title,
    file_name,
    word_count,
    summary_text,
    created_at,
    original_file_url,
  } = summary;

  if (!summary) {
    return notFound();
  }

  return (
    <div className="relative isolate min-h-screen w-full bg-linear-to-b from-rose-50/40 to-white overflow-auto">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              created_at={created_at}
              word_count={word_count}
            />
          </div>
          {file_name && (
            <SourceInfo
              file_name={file_name}
              original_file_url={original_file_url}
              title={title}
              summary_text={summary_text}
              created_at={created_at}
            />
          )}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative mt-4 sm:mt-6 lg:mt-16">
              <div className="relative p-4 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl border shadow-xl border-rose-100/30 transition-all hover:shadow-2xl duration-300 hover:bg-white/90 max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                  {word_count?.toLocaleString()} words
                </div>

                <div className="relative mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary={summary_text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSummary;
