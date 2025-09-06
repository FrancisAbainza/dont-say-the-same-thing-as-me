"use server";
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const themes = [
  "General",
  "Geography",
  "Arts",
  "Literature",
  "Science",
  "Sports",
  "History",
  "Technology",
  "Music",
  "Movies & TV",
  "Pop Culture",
  "Food & Drink",
  "Travel & Places",
  "Nature & Environment",
  "Mythology",
  "Politics & Current Events",
  "Business & Economics",
  "Health & Medicine",
  "Fashion & Lifestyle",
  "Gaming",
  "Languages",
  "Space & Astronomy",
  "Riddles & Logic",
  "Animals",
  "Hobbies"
];

const answerType = ["ordinary", "ordinary", "ordinary", "obscure"];

export const getCategory = async (prevCategories: string[]) => {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const randomAnswerType = answerType[Math.floor(Math.random() * answerType.length)];

  const { object: category } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      category: z.string().describe(`A category about ${randomTheme}, e.g. Name a color`),
      answer: z.string().describe('Your answer to that category, e.g. blue'),
    }),
    prompt: `Generate a random close ended category about ${randomTheme} for a "dont say the same thing as me" game and your answer to that category. Do not ask ${prevCategories.join(", ")}. Make your answer ${randomAnswerType}.`,
  });

  return category;
}

export const checkAnswer = async (userAnswer: string, botAnswer: string | undefined, currentCategory: string | undefined) => {
  const { object: result } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      isSame: z.boolean().describe(`Is ${userAnswer} the same as ${botAnswer}? "true" they are the same, "false" they are not the same.`),
      isCorrect: z.boolean().describe(`Verify is this answer: ${userAnswer} fits this category: ${currentCategory}`),
    }),
    prompt: `Verify is this answer: ${userAnswer} is correct for a game of "dont say the same thing as me"`,
  });

  return result;
}