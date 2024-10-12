"use client";

import React, { useState, ReactNode, ElementType } from 'react';
import { FaGamepad } from 'react-icons/fa';

interface GameLetterProps {
  character: string;
  backgroundColor?: string;
}

const GameLetter: React.FC<GameLetterProps> = ({ character, backgroundColor = '#3a86ff'}) => {

  return (
    <div style={{...styles.card, backgroundColor}}>
        {character}
    </div>
  )
};

const styles = {
  card: {
    backgroundColor: '#3a86ff',
    height: '3rem',
    width: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
  } as React.CSSProperties
};

export default GameLetter;
