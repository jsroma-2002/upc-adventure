import { Character } from "@/interfaces/entities/character";
import { Message } from "@/interfaces/entities/message";
import { getCharacterByCoordinates } from "@/services/rooms/characters-service";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface CharacterDisplay {
  positionX: string;
  positionY: string;
  disableKeyboard: () => void;
}

export default function CharactersDisplay({
  positionX,
  positionY,
  disableKeyboard,
}: CharacterDisplay) {
  const characters = getCharacterByCoordinates(positionX, positionY);

  const initialMessages: Message[] = [
    new Message("1", "Hola, ¿cómo estás?", true),
  ];

  const [messages, setMessage] = useState(initialMessages);

  const [userInput, setUserInput] = useState("");

  const [showChat, setShowChat] = useState(false);

  const [teacher, setTeacher] = useState<Character | null>(null);

  return (
    <>
      {characters.map((character) => (
        <Image
          key={character.id}
          src={character.image}
          alt={character.name}
          className="absolute top-24 cursor-pointer"
          width={500}
          height={250}
          onClick={() => {
            setShowChat(!showChat);
            setTeacher(character);
            disableKeyboard();
          }}
        />
      ))}
      {showChat && (
        <section className="w-1/2 right-0 flex flex-col backdrop-blur h-full absolute p-8 place-content-between border-l">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Foto Perfil Profesor"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <article>
                <CardTitle>{teacher?.name}</CardTitle>
                <CardDescription>{teacher?.description}</CardDescription>
              </article>
            </CardHeader>
          </Card>
          <ScrollArea className="h-5/6 py-4 flex flex-col">
            {messages.map((message) =>
              message.isExternal ? (
                <div className="w-full flex mb-2" key={message.id}>
                  <span className="p-2 border text-white bg-primary rounded-full px-4 w-fit">
                    <p className="w-fit">{message.content}</p>
                  </span>
                </div>
              ) : (
                <div className="w-full justify-end flex mb-2" key={message.id}>
                  <span className="p-2 borde border-accent bg-accent rounded-full px-4 w-fit place-content-end">
                    <p className="w-fit">{message.content}</p>
                  </span>
                </div>
              )
            )}
          </ScrollArea>
          <form className="flex  w-full items-center space-x-2">
            <Input
              defaultValue={userInput}
              className="w-2/4"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              type="text"
              placeholder="Mensaje..."
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (userInput !== "") {
                  setMessage([
                    ...messages,
                    new Message(messages.length.toString(), userInput, false),
                  ]);
                }
                setUserInput("");
              }}
              className="w-1/4"
              type="submit"
            >
              Enviar
            </Button>
            <Button
              onClick={() => {
                setShowChat(false);
                disableKeyboard();
                setMessage(initialMessages);
              }}
              className="w-1/4"
              variant={"destructive"}
            >
              Salir
            </Button>
          </form>
        </section>
      )}
    </>
  );
}
