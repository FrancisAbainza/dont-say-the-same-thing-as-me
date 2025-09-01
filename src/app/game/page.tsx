import { Progress } from "@/components/ui/progress";
import { AlarmClock, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import AnswerForm from "@/components/answer-form";

export default function Game() {
  return (
    <main className="flex flex-col gap-3 container mx-auto px-3 pt-20 md:px-6">
      <section className="flex justify-between items-center">
        <div className="flex gap-3 p-3 bg-primary text-primary-foreground rounded-md"><Trophy /> Score: 0</div>
        <div className="flex gap-3 items-center">
          <AlarmClock />
          <div className="w-20 sm:w-40 md:w-60">
            <p>10s</p>
            <Progress value={33} />
          </div>
        </div>
      </section>
      <Card className="flex flex-col items-center">
        <CardContent className="flex flex-col items-center text-center">
          <Image src="/character.png" alt="character" width={200} height={200} />
          <p>Remember: Don’t say the same thing as me!</p>
          <h1 className="text-4xl font-bold">Category: Name a color</h1>
        </CardContent>
      </Card>
      <AnswerForm />
    </main>
  );
}