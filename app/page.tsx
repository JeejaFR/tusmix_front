"use client";

import Head from 'next/head';
import GameButton from '@/components/GameButton';
import { FaUser, FaUsers, FaRegSquare } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <Head>
        <title>TUSMIX</title>
        <meta name="description" content="TUSMIX" />
      </Head>
      <h1 style={styles.title}>
        Bienvenue sur <span style={{ color: '#ff595e' }}>TUSMIX</span>
      </h1>
      <div style={styles.buttonContainer}>
        <GameButton onClick={() => alert('Bienvenue sur TUSMIX !')} icon={FaRegSquare}>Mot du jour</GameButton>
        <GameButton onClick={() => alert('Bienvenue sur TUSMIX !')} icon={FaRegSquare}>Suite du jour</GameButton>
        <GameButton onClick={() => alert('Bienvenue sur TUSMIX !')} icon={FaUser}>Solo</GameButton>
        <GameButton onClick={() => alert('Bienvenue sur TUSMIX !')} icon={FaUsers}>Multijoueur</GameButton>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'top',
    height: '100vh',
    fontFamily: '"Poppins", sans-serif',
  } as React.CSSProperties,
  title: {
    fontSize: '6rem',
    fontWeight: '700',
    color: '#1982c4',
    marginBottom: '20px',
    marginTop: '10rem',
  } as React.CSSProperties,
  buttonContainer: {
    display: 'grid',
    gap: '1rem',
  } as React.CSSProperties,
};

export default Home;
