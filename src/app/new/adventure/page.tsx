"use client";
import { Card } from "@/components/ui/card";
import { Adventure } from "@/interfaces/entities/adventure";
import { useSave } from "@/providers/save-provider";
import { GetAventure } from "@/services/new/adventure-service";
import { useEffect, useState } from "react";

export default function AdventurePage() {
  const [adventure, setAdventure] = useState<Adventure | null>(null);

  const { save } = useSave();

  useEffect(() => {
    setAdventure(GetAventure(save.difficulty));
  }, [save]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {adventure ? (
        <Card className="p-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {adventure.title}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {adventure.description}
          </p>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Objetivos
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Estos son tus objetivos:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {adventure.objectives.map((objective) => (
              <li key={objective.id}>{objective.name}</li>
            ))}
          </ul>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
