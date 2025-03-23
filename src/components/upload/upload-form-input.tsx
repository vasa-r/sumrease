import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  // ref: RefObject<HTMLFormElement | null>;
  loading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, FormInputProps>(
  ({ onSubmit, loading }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            className={cn(loading && "opacity-50 cursor-not-allowed")}
            disabled={loading}
          />
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
