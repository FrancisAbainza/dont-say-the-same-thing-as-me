"use client";
import { LogOut, Play, Trophy } from "lucide-react";
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
import { checkAnswer, getCategory } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WorldRecordDialog from "./world-record-dialog";

type phaseType = "loading" | "roundStart" | "correct" | "incorrect-issame" | "incorrect-iswrong" | "gameEnded";

export default function Game() {
  const [score, setScore] = useState<number>(0);
  const [categories, setCategories] = useState<{ category: string; answer: string }[]>([]);
  const [phase, setPhase] = useState<phaseType>("loading");
  const [isRecordFormOpen, setIsRecordFormOpen] = useState(false);
  const timerRef = useRef<TimerRef>(null);
  const currentCategory = categories.at(-1)?.category;
  const botAnswer = categories.at(-1)?.answer;
  let label = "";

  if (phase === "loading") label = "Loading ";
  else if (phase === "roundStart") label = "";
  else if (phase === "correct") label = "Next round in ";
  else if (phase === "incorrect-issame" || phase === "incorrect-iswrong") label = "Game end in ";
  else if (phase === "gameEnded") label = "Game over ";

  const startGame = async () => {
    setScore(0);
    await startRound();
  }

  const startRound = async () => {
    setPhase("loading");

    await generateCategory();

    setPhase("roundStart");
    handleStart(10, () => {
      handleGameEnded();
    });
  }

  const generateCategory = async () => {
    const response = await getCategory(categories.map((category) => (category.category)));
    setCategories((prev) => [...prev, response]);
  }

  const handleStart = (duration: number, onComplete: () => void) => {
    timerRef.current?.start(duration, onComplete);
  }

  const handleStop = () => {
    timerRef.current?.stop();
  }

  const handleGameEnded = () => {
    setPhase("gameEnded");
    setIsRecordFormOpen(true);
  }

  const handleSubmit = async (data: z.infer<typeof answerSchema>) => {
    handleStop();
    const userAnswer = data.answer;

    const response = await checkAnswer(userAnswer, botAnswer, currentCategory);
    console.log(response)

    if (!response.isSame && response.isCorrect) {
      setScore(prev => prev + 1);
      setPhase("correct");
      handleStart(5, () => {
        startRound();
      });
    } else {
      if (!response.isCorrect) {
        setPhase("incorrect-iswrong");
      }

      if (response.isSame) {
        setPhase("incorrect-issame");
      }

      handleStart(5, () => {
        handleGameEnded();
      });
    }
  }

  useEffect(() => {
    startGame();
  }, []);

  return (
    <main className="flex flex-col gap-3 container mx-auto px-3 pt-20 md:px-6">
      <section className="flex justify-between items-center">
        <div className="flex gap-3 p-3 bg-primary text-primary-foreground rounded-md"><Trophy /> Score: {score}</div>
        <Timer
          ref={timerRef}
          label={label}
          className="justify-center"
        />
      </section>
      <Card className="flex flex-col items-center">
        <CardContent className="flex flex-col items-center text-center">
          <Image src="/character.png" alt="character" width={200} height={200} />
          <p>Remember: Don’t say the same thing as me!</p>
          {phase === "loading" && (
            <h1 className="text-4xl font-bold">Waiting for category...</h1>
          )}
          {phase === "roundStart" && (
            <h1 className="text-4xl font-bold">Category: {currentCategory}</h1>
          )}
          {(phase === "correct" || phase === "incorrect-issame" || phase === "incorrect-iswrong") && (
            <h1 className="text-4xl font-bold">My answer was: {botAnswer}</h1>
          )}
          {phase === "gameEnded" && (
            <h1 className="text-4xl font-bold">Game Over!</h1>
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3 mt-12 text-center">
        {phase === "roundStart" && (
          <AnswerForm onSubmit={handleSubmit} />
        )}
        {phase === "correct" && (
          <p className="text-xl">You earned a point!</p>
        )}
        {phase === "incorrect-issame" && (
          <p className="text-xl">You answered the same thing as me. You lose!</p>
        )}
        {phase === "incorrect-iswrong" && (
          <p className="text-xl">Your answer does not fit the category. You lose!</p>
        )}
        {phase === "gameEnded" && (
          <>
            <p>Every failure is a rehearsal for success.</p>
            <p className="text-2xl">Final Score: {score}</p>
            <div className="flex flex-col gap-3 justify-center
            sm:flex-row">
              <Button onClick={() => {
                startGame();
              }}><Play /> PLAY AGAIN</Button>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto"><LogOut /> GO TO TITLE SCREEN</Button>
              </Link>
            </div>
          </>
        )}
      </div>

      <WorldRecordDialog open={isRecordFormOpen} setOpen={setIsRecordFormOpen} score={score}/>
    </main>
  );
}