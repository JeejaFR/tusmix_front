// "use client";

// import React, { useState } from "react";
// import GameLetter from "@/components/GameLetter";
// import useMultiplayerSocket from "./useMultiplayerSocket";

// import styles from "./multiplayer.module.css";

// const Multiplayer: React.FC = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomCode = urlParams.get("roomCode");
//   const { wordLength, wordFirstLetter, guessResult, makeGuess } =
//     useMultiplayerSocket();
//   const [currentGuess, setCurrentGuess] = useState("");

//   // Initialiser l'historique avec des mots vides remplis de underscores
//   const [historique, setHistorique] = useState(
//     Array(5).fill("_".repeat(wordLength))
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (currentGuess.length !== wordLength - 1) {
//       alert(
//         `Le mot doit faire exactement ${wordLength} caractères (en comptant '${wordFirstLetter}' comme première lettre).`
//       );
//       return;
//     }

//     const fullGuess = wordFirstLetter + currentGuess;

//     setHistorique((prev) => {
//       const newHistorique = [...prev];

//       // Décaler toutes les entrées vers le bas
//       for (let i = newHistorique.length - 1; i > 0; i--) {
//         newHistorique[i] = newHistorique[i - 1];
//       }

//       // Mettre à jour la première entrée avec le mot deviné, en gardant la première lettre
//       newHistorique[0] = fullGuess;

//       return newHistorique;
//     });

//     makeGuess(roomCode as string, fullGuess);
//     setCurrentGuess("");
//   };

//   const formatWord = (word: string) => {
//     if (word.length > wordLength) {
//       return word.slice(0, wordLength);
//     }
//     return word.padEnd(wordLength, "_");
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value.slice(0, wordLength - 1);
//     setCurrentGuess(newValue);

//     setHistorique((prev) => {
//       const newHistorique = [...prev];
//       const currentWordArray = new Array(wordLength).fill("_");

//       // Garder la première lettre
//       currentWordArray[0] = wordFirstLetter;

//       // Remplacer les underscores par les lettres du currentGuess
//       for (let i = 0; i < newValue.length; i++) {
//         currentWordArray[i + 1] = newValue[i];
//       }

//       // Remplace la dernière entrée de l'historique avec le mot en cours
//       newHistorique[newHistorique.length - 1] = currentWordArray.join("");
//       return newHistorique;
//     });
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Jeu de Devinettes Multijoueur</h1>

//       {historique.map((word, rowIndex) => (
//         <div key={rowIndex} className={styles.characterContainer}>
//           {formatWord(word)
//             .split("")
//             .map((char, index) => (
//               <GameLetter key={index} character={char} />
//             ))}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={currentGuess}
//           onChange={handleInputChange}
//           maxLength={wordLength - 1}
//           placeholder={`Votre devinette (${wordFirstLetter} + ${wordLength - 1} lettres)`}
//         />
//         <button type="submit">Deviner</button>
//       </form>

//       {guessResult && <p>{guessResult}</p>}
//     </div>
//   );
// };

// export default Multiplayer;

"use client";

import React, { useState } from "react";
import GameLetter from "@/components/GameLetter";
import useMultiplayerSocket from "./useMultiplayerSocket";

import styles from "./multiplayer.module.css";

const Multiplayer: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get("roomCode");

  const { wordLength, wordFirstLetter, guessResult, makeGuess } =
    useMultiplayerSocket();

  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(wordLength).fill("")
  );

  const [historique, setHistorique] = useState(
    Array(5).fill("_".repeat(wordLength))
  );

  const handleSubmit = () => {
    const fullGuess = wordFirstLetter + currentGuess.join("");

    if (fullGuess.length !== wordLength) {
      alert(`Le mot doit faire exactement ${wordLength} caractères.`);
      return;
    }

    setHistorique((prev) => {
      const newHistorique = [...prev];

      for (let i = newHistorique.length - 1; i > 0; i--) {
        newHistorique[i] = newHistorique[i - 1];
      }

      newHistorique[0] = fullGuess;

      return newHistorique;
    });

    makeGuess(roomCode as string, fullGuess);
    setCurrentGuess(Array(wordLength).fill(""));
  };

  const handleLetterChange = (index: number, value: string) => {
    setCurrentGuess((prev) => {
      const newGuess = [...prev];
      newGuess[index - 1] = value;
      return newGuess;
    });
  };

  if (!wordLength || !wordFirstLetter) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Jeu de Devinettes Multijoueur</h1>

      {historique.map((word, rowIndex) => (
        <div key={rowIndex} className={styles.characterContainer}>
          {word.split("").map((char, index) => (
            <GameLetter key={index} character={char} isFixed />
          ))}
        </div>
      ))}

      <div className={styles.characterContainer}>
        {Array(wordLength)
          .fill(null)
          .map((_, index) => (
            <GameLetter
              key={index}
              character={
                index === 0 ? wordFirstLetter : currentGuess[index - 1]
              }
              onChange={(value) => handleLetterChange(index, value)}
              isFixed={index === 0}
            />
          ))}
      </div>

      <button onClick={handleSubmit}>Deviner</button>
      {guessResult && <p>{guessResult}</p>}
    </div>
  );
};

export default Multiplayer;
