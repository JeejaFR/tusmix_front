"use client";

import React, { useState } from 'react';
import useMultiplayerSocket from './useMultiplayerSocket';
import { useRouter } from 'next/router';

const Multiplayer: React.FC = () => {
  const router = useRouter(); // Initialisation de useRouter
  const { roomCode } = router.query;
  const { wordLength, guessResult, makeGuess } = useMultiplayerSocket();
  const [currentGuess, setCurrentGuess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    makeGuess(roomCode as string, currentGuess);
    setCurrentGuess("");
  };

  return (
    <div>
      <h1>Jeu de Devinettes Multijoueur</h1>
      {wordLength && <p>Longueur du mot : {wordLength}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
          placeholder="Votre devinette"
        />
        <button type="submit">Deviner</button>
      </form>
      {guessResult && <p>{guessResult}</p>}
    </div>
  );
};

export default Multiplayer;
