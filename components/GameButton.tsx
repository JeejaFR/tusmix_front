"use client";

import React, { useState, ReactNode, ElementType } from 'react';
import { FaGamepad } from 'react-icons/fa';

interface GameButtonProps {
  children: ReactNode;
  onClick: () => void;
  icon?: ElementType;
}

const GameButton: React.FC<GameButtonProps> = ({ children, onClick, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.button,
        ...(isHovered ? styles.buttonHover : {}),
      }}
    >
      {Icon && <Icon style={styles.icon} />}
      {children}
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#3a86ff',
    color: '#ffffff',
    height: '6rem',
    width: '25rem',
    padding: '2rem 3rem',
    fontSize: '1.4rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 6px 15px rgba(58, 134, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textAlign: 'left',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  } as React.CSSProperties,
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(58, 134, 255, 0.6)',
    backgroundColor: '#ff595e',
  } as React.CSSProperties,
  icon: {
    fontSize: '1.8rem',
    color: '#ffffff',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  } as React.CSSProperties,
};

export default GameButton;
