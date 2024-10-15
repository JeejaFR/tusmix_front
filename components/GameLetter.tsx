"use client";

import React from "react";

interface GameLetterProps {
  character: string;
  onChange: (value: string) => void;
  isFixed?: boolean;
}

const GameLetter: React.FC<GameLetterProps> = ({
  character,
  onChange,
  isFixed = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 1);
    onChange(value);
  };

  return (
    <div style={styles.card}>
      {isFixed ? (
        <span style={styles.letter}>{character}</span>
      ) : (
        <input
          type="text"
          value={character}
          onChange={handleChange}
          style={styles.input}
          maxLength={1}
        />
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#3a86ff",
    height: "3rem",
    width: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    margin: "0.2rem",
  } as React.CSSProperties,
  input: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    textAlign: "center",
    width: "100%",
    height: "100%",
  } as React.CSSProperties,
  letter: {
    fontSize: "1.5rem",
    color: "#fff",
    fontWeight: "bold",
  } as React.CSSProperties,
};

export default GameLetter;
