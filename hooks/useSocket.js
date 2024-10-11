import { delay } from "framer-motion";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const useSocket = () => {
  const [players, setPlayers] = useState([]);
  const [isPlayerKicked, setIsPlayerKicked] = useState(false);
  const [error, setError] = useState("");


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
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  const createRoom = (username, callback) => {
    if(!username){
        username = 'guest_' + Math.random().toString(36).substring(2, 15);
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
    })
  };

  const joinRoom = (roomCode, username, callback) => {
    if(!username){
        username = 'guest_' + Math.random().toString(36).substring(2, 15);
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

  return { players, isPlayerKicked, createRoom, joinRoom, leaveRoom, error };
};

export default useSocket;
