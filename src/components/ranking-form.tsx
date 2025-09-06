"use client";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { rankingSchema } from "@/lib/validation/worldRecordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RankingForm({ onSubmit }: { onSubmit: (data: z.infer<typeof rankingSchema>) => void}) {
  const form = useForm<z.infer<typeof rankingSchema>>({
    resolver: zodResolver(rankingSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

  );
}