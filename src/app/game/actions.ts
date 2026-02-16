"use server";
import { db } from '@/db/db';
import { rankings } from '@/db/schema';
import { gateway, generateObject } from 'ai';
import { z } from 'zod';

const model = gateway('anthropic/claude-sonnet-4-20240924');

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
  "Fashion & Lifestyle",
  "Gaming",
  "Animals",
  "Hobbies",
  "Comics & Graphic Novels",
  "Anime & Manga",
  "Board Games & Puzzles",
  "Internet Culture & Memes",
  "Superheroes & Villains",
  "Photography",
  "Dance & Performance Arts",
  "Children's Literature",
  "Crafts & DIY",
  "Automotive & Vehicles",
  "Magic & Fantasy"
];

const answerType = ["ordinary", "ordinary", "ordinary", "obscure"];

export const getCategory = async (prevCategories: string[]) => {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const randomAnswerType = answerType[Math.floor(Math.random() * answerType.length)];

  const { object: category } = await generateObject({
    model: model,
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
    model: model,
    schema: z.object({
      isSame: z.boolean().describe(
        `Determine if the user's answer is the same as the bot's answer. 
        Return true if they are equivalent ignoring case and minor variations; 
        false if they are different. Sysnonyms are considered the same.
        Examples: "banana" is the same as "Banana", "Washington" is the same as "George Washington". "kicks" is the same as "sneakers".`
      ),
      isCorrect: z.boolean().describe(
        `Determine if the user's answer belongs to the category "${currentCategory}". 
        Return true if it fits the category, false otherwise.`
      ),
    }),
    prompt: `You are evaluating a game response.
    User's answer: "${userAnswer}"
    Bot's answer: "${botAnswer}"
    Category: "${currentCategory}"
  
    1. Check if the user's answer is the same as the bot's answer.
    2. Check if the user's answer fits the category.
  
    Respond only with a JSON object matching this schema:
    {
      "isSame": boolean,
      "isCorrect": boolean
    }`
  });

  return result;
}

export const createRanking = async (name: string, score: number) => {
  const playerRanking: typeof rankings.$inferInsert = {
    name,
    score,
  };

  await db.insert(rankings).values(playerRanking);
}