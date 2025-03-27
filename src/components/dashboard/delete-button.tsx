"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteSummaryAction } from "@/actions/summary-action";
import toast from "react-hot-toast";

interface DeleteBtnProps {
  summaryId: string;
}

const DeleteButton = ({ summaryId }: DeleteBtnProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deleteSummaryAction(summaryId);

        if (!result.success) {
          toast.error(result.message);
        }

        toast.success(result.message);
      } catch (error) {
        console.log(error);
      } finally {
        setOpen(false);
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => setOpen(false)}
            variant={"ghost"}
            className="text-black hover:text-gray-800 bg-gray-50 border border-gray-200 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            className="text-white hover:bg-rose-500"
            disabled={isPending}
          >
            {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
