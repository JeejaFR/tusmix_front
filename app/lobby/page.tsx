"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import Head from "next/head";
import { FaHome, FaGamepad, FaPlay } from "react-icons/fa";
import PlayersList from "@/components/PlayersList";
import GameButton from "@/components/GameButton";
import IconButton from "@/components/IconButton";
import InputButton from "@/components/InputButton";
import InputText from "@/components/InputText";
import useSocket from "@/hooks/useSocket";
import Link from "next/link";

import styles from "./lobby.module.css";
import GameLetter from "@/components/GameLetter";

const Lobby: React.FC = () => {
  const [roomCode, setRoomCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [isSelectingMode, setIsSelectingMode] = useState(true);
  const [isCreatorOfRoom, setIsCreatorOfRoom] = useState(false);
  const [username, setUsername] = useState("");

  const [currentGuess, setCurrentGuess] = useState("");
  const [historique, setHistorique] = useState<Array<string>>(Array(5).fill(""));

  const { players, isPlayerKicked, isGameStarted, wordLength, wordFirstLetter, guessResult, resetHistorique, canPlay, createRoom, joinRoom, leaveRoom, startGame, makeGuess } = useSocket();

  useEffect(() => {
    if (isPlayerKicked) {
      setInRoom(false);
      setIsSelectingMode(true);
      setIsCreatorOfRoom(false);
      setInputCode("");
      setRoomCode("");
    }
  }, [isPlayerKicked]);

  useEffect(() => {
    setHistorique(Array(5).fill(""));
  }, [resetHistorique]);

  useEffect(() => {
    if (wordFirstLetter) {
      setHistorique((prevHistorique) => {
        const newHistorique = [...prevHistorique];
        newHistorique[newHistorique.length - 1] = wordFirstLetter;
        return newHistorique;
      });
    }
  }, [wordFirstLetter]);

  const handleCreateRoom = () => {
    createRoom(username, (generatedRoomCode: string) => {
      setRoomCode(generatedRoomCode);
      setInRoom(true);
      setIsCreatorOfRoom(true);
      setIsSelectingMode(false);
    });
  };

  const handleJoinRoom = () => {
    joinRoom(inputCode, username, (success: boolean) => {
      if (success) {
        setRoomCode(inputCode);
        setInRoom(true);
        setIsCreatorOfRoom(false);
        setIsSelectingMode(false);
      } else {
        alert("La room n'existe pas !");
      }
    });
  };
  const handleStartGame = async () => {
    startGame(roomCode);
  };

  const handleLeaveRoom = () => {
    leaveRoom(roomCode, isCreatorOfRoom, () => {
      setRoomCode("");
      setInRoom(false);
      setIsCreatorOfRoom(false);
      setIsSelectingMode(true);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentGuess.length !== (wordLength || 0) - 1) {
      alert(`Le mot doit faire exactement ${wordLength} caractères (en comptant '${wordFirstLetter}' comme première lettre).`);
      return;
    }

    const fullGuess = wordFirstLetter + currentGuess;

    setHistorique((prev) => {
      const newHistorique = [...prev];
      for (let i = newHistorique.length - 1; i > 0; i--) {
        newHistorique[i] = newHistorique[i - 1];
      }
      newHistorique[0] = fullGuess;
      newHistorique[newHistorique.length - 1] = wordFirstLetter;
      return newHistorique;
    });

    if (roomCode) {
      console.log("Faire la supposition avec roomCode:", roomCode);
      makeGuess(roomCode, fullGuess);
    }

    setCurrentGuess("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, wordLength || 0 - 1);
    setCurrentGuess(newValue);

    setHistorique((prev) => {
      const newHistorique = [...prev];
      const currentWordArray = new Array(wordLength).fill("_");

      currentWordArray[0] = wordFirstLetter;
      for (let i = 0; i < newValue.length; i++) {
        currentWordArray[i + 1] = newValue[i];
      }

      newHistorique[newHistorique.length - 1] = currentWordArray.join("");
      return newHistorique;
    });
  };

  const formatWord = (word: string) => {
    if (word.length > wordLength) {
      return word.slice(0, wordLength);
    }
    return word.padEnd(wordLength, "_");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TUSMIX</title>
        <meta name="description" content="TUSMIX" />
      </Head>

      <div className={styles.title}>
        <Link href="/">
          <IconButton icon={FaHome} onClick={() => {}} />
        </Link>
        <h1>TUSMIX</h1>
      </div>

      {!isGameStarted ? (
        <>
          {!isSelectingMode ? (
            <PlayersList players={players} />
          ) : (
            <InputText placeholder={"Choisissez un pseudo"} value={username} onInputChange={(e) => setUsername(e.target.value)} />
          )}

          {!inRoom ? (
            <div className="buttonContainer">
              <GameButton onClick={handleCreateRoom} icon={FaGamepad}>
                Créer une Room
              </GameButton>
              <div className={styles.inputContainer}>
                <InputButton placeholder={"Rejoindre une partie"} value={inputCode} onInputChange={(e) => setInputCode(e.target.value)} onClick={handleJoinRoom} icon={FaPlay}>
                  Rejoindre la Room
                </InputButton>
              </div>
            </div>
          ) : (
            <>
              {isCreatorOfRoom && (
                <div className={styles.creatorContainer}>
                  <div className={styles.codeContainer}>
                    <p className={styles.codeTitle}>
                      Code de la Room <br />
                      <span className={styles.codeTexte}>{roomCode}</span>
                    </p>
                  </div>
                  <GameButton onClick={handleStartGame} icon={FaGamepad}>
                    Lancer la partie
                  </GameButton>
                </div>
              )}
              <GameButton onClick={handleLeaveRoom} icon={FaGamepad} backgroundColor="#ff4b5C">
                Quitter la Room
              </GameButton>
            </>
          )}
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.scores}>
            <h2>Scores :</h2>
            {players &&
              players.map(({ username, score }, index) => (
                <p key={index}>
                  {username} : {score}
                </p>
              ))}
          </div>

          {historique.map((word, rowIndex) => {
            return (
              <div key={rowIndex} className={styles.characterContainer}>
                {formatWord(word)
                  .split("")
                  .map((char, index) => (
                    <GameLetter key={index} character={char} />
                  ))}
              </div>
            );
          })}
          {canPlay? (
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={currentGuess}
              onChange={handleInputChange}
              maxLength={wordLength - 1}
              placeholder={`Votre devinette (${wordFirstLetter} + ${wordLength - 1} lettres)`}
            />
            <button type="submit">Deviner</button>
          </form>
          ): (
            <></>
          )}
          

          {guessResult && <p>{guessResult}</p>}
        </div>
      )}
    </div>
  );
};

export default Lobby;
