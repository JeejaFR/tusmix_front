"use client";

import Head from "next/head";
import IconButton from "@/components/IconButton";
import { FaHome, FaGamepad } from "react-icons/fa";
import PlayersList from "@/components/PlayersList";
import GameButton from "@/components/GameButton";
import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

const Multijoueur: React.FC = () => {
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputCode, setInputCode] = useState(""); // Code de la room saisi par l'utilisateur
  const [inRoom, setInRoom] = useState(false); // Nouvel état pour savoir si l'utilisateur est dans une room
  const [username, setUsername] = useState("joueur A");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
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
  };

  const createRoom = () => {
    socket.emit("createRoom", (generatedRoomCode) => {
      setRoomCode(generatedRoomCode);
      setInRoom(true);
    });
  };

  const joinRoom = (code: string, username: string) => {
    socket.emit("joinRoom", code, username, (playersInRoom) => {
      setPlayers(playersInRoom);
      setRoomCode(code);
      setInRoom(true);
    });
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomCode, () => {
      setRoomCode("");
      setInRoom(false);
      setPlayers([]);
    });
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>TUSMIX</title>
        <meta name="description" content="TUSMIX" />
      </Head>

      <div style={styles.title}>
        <IconButton icon={FaHome} onClick={() => {}} />
        <h1 style={styles.title}>TUSMIX</h1>
      </div>
      <PlayersList players={players} />

      {!inRoom ? (
        <>
          <GameButton onClick={createRoom} icon={FaGamepad}>Créer une Room</GameButton>
          <div style={styles.inputContainer}>
            <input 
              type="text" 
              placeholder="Code de la room" 
              value={inputCode} 
              onChange={(e) => setInputCode(e.target.value)} 
              style={styles.input}
            />
            <GameButton 
              onClick={() => joinRoom(inputCode, "Joueur " + (players.length + 1))} 
              icon={FaGamepad}
            >
              Rejoindre la Room
            </GameButton>
          </div>
        </>
      ) : (
        <>
          <p>Code de la Room: {roomCode}</p>
          <GameButton onClick={leaveRoom} icon={FaGamepad}>
            Quitter la Room
          </GameButton>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
    height: "100vh",
    background: "linear-gradient(135deg, #0d1b2a, #1b263b, #415a77)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
    fontFamily: '"Poppins", sans-serif',
  } as React.CSSProperties,
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "20px",
    marginTop: "2rem",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#ffffff",
    textShadow: `
      0px 0px 4px rgba(0, 150, 255, 0.6), 
      0px 0px 8px rgba(0, 150, 255, 0.4),
      0px 0px 12px rgba(0, 150, 255, 0.2)
    `,
  } as React.CSSProperties,

  buttonContainer: {
    display: "grid",
    gap: "1rem",
  } as React.CSSProperties,

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  } as React.CSSProperties,
  
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    fontSize: "1rem",
  } as React.CSSProperties,
};

export default Multijoueur;
