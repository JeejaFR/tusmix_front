import { delay } from "framer-motion";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const useSocket = () => {
  const [players, setPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPlayerKicked, setIsPlayerKicked] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const [resetHistorique, setResetHistorique] = useState(0);
  const [error, setError] = useState("");

  const [guessResult, setGuessResult] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [wordFirstLetter, setWordFirstLetter] = useState("");

  useEffect(() => {
    socket = io("http://localhost:4001");

    socket.on("roomPlayers", (playersInRoom) => {
      setPlayers(playersInRoom);
    });

    socket.on("playerJoined", (username) => {
      setPlayers((prevPlayers) => {
        if (!prevPlayers.includes(username)) {
          return [...prevPlayers, username];
        }
        return prevPlayers;
      });
    });

    socket.on("playerLeft", (username) => {
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player !== username));
    });

    socket.on("kickPlayer", () => {
      setIsPlayerKicked(true);
    });

    socket.on("startGame", () => {
      setIsGameStarted(true);
    });

    socket.on("wordLength", (length) => {
      console.log("length: " + length);
      setWordLength(length);
    });

    socket.on("wordFirstLetter", (firstLetter) => {
      console.log("firstLetter: " + firstLetter);
      setWordFirstLetter(firstLetter);
    });

    socket.on("guessResult", (data) => {
      setGuessResult(data.result);
      if (data.result === "Vous avez déjà atteint le nombre maximum d'essais.") {
        setCanPlay(false);
      }
    });

    socket.on("newWord", () => {
      setResetHistorique((prevReset) => {
        const newHistorique = prevReset + 1;
        return newHistorique;
      });
      setTimeout(() => {
        setGuessResult("");
      }, 2000);
      setCanPlay(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createRoom = (username, callback) => {
    if (!username) {
      username = "guest_" + Math.random().toString(36).substring(2, 15);
    }
    socket.emit("createRoom", username, (response) => {
      if (response.success) {
        setIsPlayerKicked(false);
        setPlayers(response.playersInRoom);
        callback(response.roomCode);
      } else {
        setError(response.message);
        callback(false);
      }
    });
  };

  const joinRoom = (roomCode, username, callback) => {
    if (!username) {
      username = "guest_" + Math.random().toString(36).substring(2, 15);
    }
    socket.emit("joinRoom", roomCode, username, (response) => {
      if (response.success) {
        setIsPlayerKicked(false);
        setPlayers(response.playersInRoom);
        callback(true);
      } else {
        setError(response.message);
        callback(false);
      }
    });
  };

  const leaveRoom = (roomCode, isCreatorLeaving, callback) => {
    setIsPlayerKicked(false);
    socket.emit("leaveRoom", roomCode, isCreatorLeaving, callback);
  };

  const startGame = (roomCode) => {
    socket.emit("askStartGame", { roomCode });
  };

  const makeGuess = (roomCode, word) => {
    socket.emit("guess", roomCode, word);
  };

  return { players, isPlayerKicked, isGameStarted, wordLength, wordFirstLetter, guessResult, resetHistorique, canPlay, createRoom, joinRoom, leaveRoom, startGame, makeGuess, error };
};

export default useSocket;
