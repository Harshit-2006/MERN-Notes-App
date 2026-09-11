import React from 'react';
import NoteCard from './NoteCard';

const NoteGrid = ({ notes, onNoteClick }) => {
  if (notes.length === 0) {
    return null; // Empty state is handled in the main component
  }

  return (
    <div style={styles.grid}>
      {notes.map(note => (
        <NoteCard key={note._id} note={note} onClick={onNoteClick} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    paddingBottom: '3rem'
  }
};

export default NoteGrid;
