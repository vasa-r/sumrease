import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: FormInputProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          className=""
        />
        <Button>Upload your PDF</Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
