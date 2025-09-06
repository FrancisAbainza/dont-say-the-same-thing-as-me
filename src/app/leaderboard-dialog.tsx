import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { rankings } from "@/db/schema";
import React, { ReactElement } from "react";

type Props = {
  children: ReactElement<HTMLElement>;
  topPlayers: typeof rankings.$inferSelect[];
}

export default function LeaderboardDialog({ children, topPlayers }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>GLOBAL LEADERBOARD🏆</DialogTitle>
          <DialogDescription>
            A cat that dreams to be a lion must lose its appetite for rats.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-3">
          {topPlayers.map((player, index) => (
            <React.Fragment key={player.id}>
              <div>{index + 1}. </div>
              <div>{player.name}</div>
              <div>{player.score}</div>
            </React.Fragment>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}