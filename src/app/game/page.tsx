"use client";
import { Trophy } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import AnswerForm from "@/components/answer-form";
import { useEffect, useRef, useState } from "react";
import { Timer, TimerRef } from "@/components/timer";
import z from "zod";
import { answerSchema } from "@/lib/validation/answerSchema";

export default function Game() {
  const [points, setPoints] = useState<number>(0);
  const [phase, setPhase] = useState<string>("");
  const [label, setLabel] = useState("Timer");
  const timerRef = useRef<TimerRef>(null);

  const startGame = () => {
    setPoints(0);
    startRound();
  }

  const startRound = () => {
    generateCategory();
    setPhase("roundStart");
    timerRef.current?.start(10);
  }

  const generateCategory = () => {
    
  }

  const handleStopTimer = () => {
    timerRef.current?.stop();
  }

  const handleTimerComplete = () => {
    console.log("Timer completed!")
  }
  
  const handleSubmit = (data: z.infer<typeof answerSchema>) => {
    handleStopTimer();
  }

  useEffect(() => {
    startGame();
  }, []);

  return (
    <main className="flex flex-col gap-3 container mx-auto px-3 pt-20 md:px-6">
      <section className="flex justify-between items-center">
        <div className="flex gap-3 p-3 bg-primary text-primary-foreground rounded-md"><Trophy /> Score: 0</div>
        <Timer
          ref={timerRef}
          label={label}
          onComplete={handleTimerComplete}
          className="justify-center"
        />
      </section>
      <Card className="flex flex-col items-center">
        <CardContent className="flex flex-col items-center text-center">
          <Image src="/character.png" alt="character" width={200} height={200} />
          <p>Remember: Don’t say the same thing as me!</p>
          <h1 className="text-4xl font-bold">Category: Name a color</h1>
        </CardContent>
      </Card>
      <AnswerForm onSubmit={handleSubmit} />
    </main>
  );
}