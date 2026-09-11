import React from 'react';

const Header = ({ onNewNote, noteCount }) => {
  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Notes</h1>
        {noteCount !== undefined && (
          <span style={styles.count}>· {noteCount}</span>
        )}
      </div>
      <button style={styles.button} onClick={onNewNote}>
        + New Note
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0 1rem 0',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '2rem'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.75rem'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0
  },
  count: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  },
  button: {
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  }
};

export default Header;
