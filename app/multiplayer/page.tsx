"use client";

import Head from "next/head";
import { FaHome, FaGamepad, FaPlay } from "react-icons/fa";
import PlayersList from "@/components/PlayersList";
import GameButton from "@/components/GameButton";
import IconButton from "@/components/IconButton";
import InputButton from "@/components/InputButton";
import InputText from "@/components/InputText";
import { useEffect, useState } from "react";

import styles from './multiplayer.module.css';
import useSocket from '@/hooks/useSocket';
import Link from "next/link";

const Multijoueur: React.FC = () => {
  const [roomCode, setRoomCode] = useState("");
  const [inputCode, setInputCode] = useState(""); 
  const [inRoom, setInRoom] = useState(false); 
  const [isSelectingMode, setIsSelectingMode] = useState(true); 
  const [isCreatorOfRoom, setIsCreatorOfRoom] = useState(false); 
  const [username, setUsername] = useState(""); 

  const { players, isPlayerKicked, createRoom, joinRoom, leaveRoom } = useSocket();

  useEffect(() => {
    if (isPlayerKicked) {
      setInRoom(false);
      setIsSelectingMode(true);
      setIsCreatorOfRoom(false);
      setInputCode("");
      setRoomCode("");
    }
  }, [isPlayerKicked]);

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

  const handleLeaveRoom = () => {
    leaveRoom(roomCode, isCreatorOfRoom, () => {
      setRoomCode("");
      setInRoom(false);
      setIsCreatorOfRoom(false);
      setIsSelectingMode(true);
    });
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
        <h1 className={styles.title}>TUSMIX</h1>
      </div>
      {!isSelectingMode ? (
        <PlayersList players={players} />
      ) :  
        <InputText placeholder={"Choisissez un pseudo"} value={username} onInputChange={(e) => setUsername(e.target.value)}></InputText>
      }
      

      {!inRoom ? (
        <div className="buttonContainer">
          <GameButton onClick={handleCreateRoom} icon={FaGamepad}>Créer une Room</GameButton>
          <div className={styles.inputContainer}>
            <InputButton placeholder={"Rejoindre une partie"} value={inputCode} onInputChange={(e) => setInputCode(e.target.value)} onClick={handleJoinRoom} icon={FaPlay}>Rejoindre la Room</InputButton>
          </div>
        </div>
      ) : (
        <>
          
          {isCreatorOfRoom ? (
            <div className={styles.creatorContainer}>
              <div className={styles.codeContainer}>
                <p className={styles.codeTitle}>Code de la Room <br/> <span className={styles.codeTexte}>{roomCode}</span></p>
              </div>
              <GameButton onClick={handleLeaveRoom} icon={FaGamepad}>Lancer la partie</GameButton>
            </div>
            ) : (
              <></>
            )
          }
          <GameButton onClick={handleLeaveRoom} icon={FaGamepad} backgroundColor="#ff4b5C">Quitter la Room</GameButton>
        </>
      )}
    </div>
  );
};

export default Multijoueur;
