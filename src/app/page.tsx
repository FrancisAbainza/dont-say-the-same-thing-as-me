import { Button } from "@/components/ui/button";
import { Lightbulb, Play, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  return (
    <main className="container mx-auto px-3 pt-20 md:px-6 flex flex-col items-center justify-between">
      <Image src="/logo.png" alt="Logo" width={500} height={500} />
      <div className="flex gap-3">
        <Link href="/game">
          <Button>
            <Play /> PLAY
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Lightbulb /> HOW TO PLAY
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>HOW TO PLAY</DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Every round, the AI will generate a random category along with an answer. Your challenge is to think of a different answer and submit it within 10 seconds.</li>
                    <li>Each time you give a unique answer, you score a point. The more rounds you win, the higher your score can get!</li>
                    <li>If you can beat the current world record, your name will be proudly displayed on the title screen for all to see.</li>
                  </ul>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-6 mt-20 items-center font-medium">
        <div className="flex items-center gap-3">
          <Trophy className="w-12 h-12" />
          <p>
            World Record: 547<br />
            By: John Doe
          </p>
        </div>
        <p className="text-center">To be top 1%, you must answer what 99% don't</p>
      </div>
    </main>
  );
}
