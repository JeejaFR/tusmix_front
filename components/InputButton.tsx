"use client";

import React, { useState, ReactNode, ElementType } from 'react';
import { FaGamepad } from 'react-icons/fa';

interface InputButtonProps {
  placeholder?: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  icon?: ElementType;
}

const InputButton: React.FC<InputButtonProps> = ({ placeholder, value, onInputChange, onClick, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.buttonContainer,
        ...(isHovered ? styles.buttonHover : {}),
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        style={styles.input}
      />
      <button
        onClick={onClick}
        style={{
          ...styles.button,
          ...(isHovered ? styles.buttonHover : {}),
        }}
      >
        {Icon && <Icon style={styles.icon} />}
      </button>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#3a86ff',
    borderRadius: '12px',
    width: '25rem',
    height: '6rem',
    boxShadow: '0 6px 15px rgba(58, 134, 255, 0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  } as React.CSSProperties,
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(58, 134, 255, 0.6)',
    backgroundColor: '#ff914d',
  } as React.CSSProperties,
  input: {
    width: '70%',
    height: '100%',
    border: 'none',
    padding: '0 1rem',
    fontSize: '1.4rem',
    fontWeight: '500',
    color: 'white',
    borderRadius: '12px 0 0 12px',
    outline: 'none',
  } as React.CSSProperties,
  button: {
    backgroundColor: '#3a86ff',
    color: '#ffffff',
    height: '100%',
    width: '30%',
    border: 'none',
    borderRadius: '0 12px 12px 0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  icon: {
    fontSize: '1.8rem',
    color: '#ffffff',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  } as React.CSSProperties,
};

export default InputButton;
