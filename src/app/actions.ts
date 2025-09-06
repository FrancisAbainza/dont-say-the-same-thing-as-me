"use server";
import { db } from "@/db/db";
import { rankings } from "@/db/schema";
import { desc } from "drizzle-orm";

export const getTopOnePlayer = async () => {
  const topPlayer = await db
    .select()
    .from(rankings)
    .orderBy(desc(rankings.score))
    .limit(1);

  return topPlayer;
}

export const getTopTenPlayers = async () => {
  const topPlayers = await db
    .select()
    .from(rankings)
    .orderBy(desc(rankings.score))
    .limit(10);

  return topPlayers;
}