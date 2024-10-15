import { cp } from "fs";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4001");

const useMultiplayerSocket = () => {
  const [wordLength, setWordLength] = useState<number | 0>(0);
  const [wordFirstLetter, setWordFirstLetter] = useState("");
  const [guessResult, setGuessResult] = useState<string | "">("");

  useEffect(() => {
    socket.on("wordLength", (data: { length: number }) => {
      setWordLength(data.length);
    });

    socket.on("wordFirstLetter", (data: { firstLetter: string }) => {
      setWordFirstLetter(data.firstLetter);
    });

    socket.on("guessResult", (data: { result: string }) => {
      console.log("data.result", data.result);
      if (data.result === "Le mot n'existe pas dans le dictionnaire.") {
      }
      setGuessResult(data.result);
    });

    // Nettoyage
    return () => {
      socket.off("wordLength");
      socket.off("guessResult");
    };
  }, []);

  // Fonction pour envoyer une devinette
  const makeGuess = (roomCode: string, word: string) => {
    console.log("makeguess", word);
    socket.emit("guess", roomCode, word);
  };

  return {
    wordLength,
    wordFirstLetter,
    guessResult,
    makeGuess,
  };
};

export default useMultiplayerSocket;
