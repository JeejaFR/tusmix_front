import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:4001");

const useMultiplayerSocket = () => {
  const [wordLength, setWordLength] = useState<number | null>(null);
  const [guessResult, setGuessResult] = useState<string | null>(null);

  useEffect(() => {
    // Écoute de la longueur du mot
    socket.on("wordLength", (data: { length: number }) => {
      setWordLength(data.length);
    });

    // Écoute des résultats de devinette
    socket.on("guessResult", (data: { result: string }) => {
      setGuessResult(data.result);
    });

    // Nettoyage
    return () => {
      socket.off("wordLength");
      socket.off("guessResult");
    };
  }, []);

  // Fonction pour envoyer une devinette
  const makeGuess = (roomCode : string, word: string) => {
    socket.emit("guess", { roomCode, word });
  };

  return {
    wordLength,
    guessResult,
    makeGuess,
  };
};

export default useMultiplayerSocket;
