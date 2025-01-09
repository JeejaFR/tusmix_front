"use client";

import React, { ElementType } from 'react';

interface InputTextProps {
  placeholder?: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ElementType;
}

const InputText: React.FC<InputTextProps> = ({ placeholder, value, onInputChange, icon: Icon }) => {

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  input: {
    width: '25rem',
    height: '5rem',
    padding: '0 1rem',
    fontSize: '1.4rem',
    fontWeight: '500',
    color: 'white',
    borderRadius: '12px',
    outline: 'none',
    marginBottom: '4rem',
  } as React.CSSProperties,
};

export default InputText;
