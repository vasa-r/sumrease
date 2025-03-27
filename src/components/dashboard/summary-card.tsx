import React from "react";
import { Card } from "@/components/ui/card";
import DeleteButton from "@/components/dashboard/delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, formatFileName } from "@/utils/format-utils";
import { PdfSummary } from "../../../types/type";

const SummaryHeader = ({
  fileUrl,
  title,
  created_at,
}: {
  fileUrl: string;
  title: string | null;
  created_at: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {formatFileName(title!)}
        </h3>
        <p className="text-sm text-gray-500">{formatDate(created_at)}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

const SummaryCard = ({ summary }: { summary: PdfSummary }) => {
  console.log(summary);
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              created_at={summary.created_at}
            />

            <p className="text-gary-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default SummaryCard;
