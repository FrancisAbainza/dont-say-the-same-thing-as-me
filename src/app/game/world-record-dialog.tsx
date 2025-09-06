"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WorldRecordForm from "@/components/ranking-form";
import { rankingSchema } from "@/lib/validation/worldRecordSchema";
import { Dispatch, SetStateAction } from "react";
import z from "zod";
import { createRanking } from "./actions";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  score: number;
}

export default function WorldRecordDialog({ open, setOpen, score }: Props) {
  const handleSubmit = async (data: z.infer<typeof rankingSchema>) => {
    await createRanking(data.name, score);
    
    toast.success("Success!", {
      description: "Your name has been added to the leaderboard",
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Score 🏆</DialogTitle>
          <DialogDescription>
            Let your success make the noise! Enter you name so we can add it in the global leaderboard for all to see.
          </DialogDescription>
        </DialogHeader>
        <WorldRecordForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}