import React from "react";
import { PdfSummary } from "../../../types/type";
import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DownloadSummaryButton from "@/components/summary/download-summary";
import { MotionDiv } from "@/components/common/motion-wrapper";

const SourceInfo = ({
  file_name: fileName,
  original_file_url: originalFileUrl,
  title,
  summary_text,
  created_at,
}: Partial<PdfSummary>) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
    >
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <Link
            href={`${originalFileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </Link>
        </Button>
        <DownloadSummaryButton
          title={title}
          file_name={fileName}
          summary_text={summary_text}
          created_at={created_at}
        />
      </div>
    </MotionDiv>
  );
};

export default SourceInfo;
