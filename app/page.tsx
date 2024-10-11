"use client";

import Head from 'next/head';
import GameButton from '@/components/GameButton';
import { FaUser, FaUsers, FaRegSquare } from 'react-icons/fa';
import '../styles/animations.css'; // Assure-toi que le chemin est correct
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <Head>
        <title>TUSMIX</title>
        <meta name="description" content="TUSMIX" />
      </Head>
      <AnimatedTitle text="TUSMIX" />
      <div style={styles.buttonContainer}>
        <Link href="/">
         <GameButton onClick={() => {}} icon={FaRegSquare}>Mot du jour</GameButton>
        </Link>
        <Link href="/">
         <GameButton onClick={() => {}} icon={FaRegSquare}>Suite du jour</GameButton>
        </Link>
        <Link href="/">
         <GameButton onClick={() => {}} icon={FaUser}>Solo</GameButton>
        </Link>
        <Link href="/multiplayer">
         <GameButton onClick={() => {}} icon={FaUsers}>Multijoueur</GameButton>
        </Link>
      </div>
    </div>
  );
};

const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1 style={styles.title}>
      {text.split('').map((letter, index) => (
        <span 
          key={index} 
          className="letter" 
          style={{ color: colors[index % colors.length], animationDelay: `${Math.random() * 2}s` }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'top',
    height: '100vh',
    background: 'linear-gradient(135deg, #0d1b2a, #1b263b, #415a77)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    fontFamily: '"Poppins", sans-serif',
  } as React.CSSProperties,  
  title: {
    fontSize: '6rem',
    fontWeight: '700',
    marginBottom: '20px',
    marginTop: '5rem',
    display: 'flex',
    color: '#ffffff', // Couleur de base blanche pour le texte
    textShadow: `
      0px 0px 4px rgba(0, 150, 255, 0.6), 
      0px 0px 8px rgba(0, 150, 255, 0.4),
      0px 0px 12px rgba(0, 150, 255, 0.2)
    `,
  } as React.CSSProperties,
  
  buttonContainer: {
    display: 'grid',
    gap: '1rem',
  } as React.CSSProperties,
};

// Tableau de couleurs pour chaque lettre
const colors = ['#ff595e', '#ffca3a', '#1982c4']; // Rouge, jaune et bleu

export default Home;
