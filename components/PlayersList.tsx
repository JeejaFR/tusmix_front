import React from 'react';

interface PlayersListProps {
  players: string[];
}

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  return (
    <div style={styles.listContainer}>
      <p style={styles.listTitle}>Liste des joueurs</p>
      {players.map((player, index) => (
        <div key={index} style={{ ...styles.playerItem, backgroundColor: colors[index % colors.length] }}>
          <span style={styles.playerText}>{player}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  listTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    height: '50%',
    overflowY: 'auto',
    marginBottom: '2rem',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  } as React.CSSProperties,
  playerItem: {
    width: '100%',
    padding: '1rem',
    margin: '0.5rem 0',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '600',
    textShadow: `
      0px 0px 4px rgba(0, 0, 0, 0.4),
      0px 0px 6px rgba(0, 0, 0, 0.2)
    `,
    transition: 'transform 0.2s ease',
  } as React.CSSProperties,
  playerText: {
    textAlign: 'center',
    letterSpacing: '1px',
  } as React.CSSProperties,
};

// const colors = ["#ff595e", "#ffca3a", "#1982c4"];
const colors = ["rgba(255, 255, 255, 0.3)"];

export default PlayersList;
