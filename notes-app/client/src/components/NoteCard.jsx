import React from 'react';

const NoteCard = ({ note, onClick }) => {
  const date = new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div style={styles.card} onClick={() => onClick(note)} tabIndex="0" role="button" aria-label={`Edit note: ${note.title}`}>
      <div style={styles.header}>
        <h3 style={styles.title}>{note.title}</h3>
        {note.isPinned && <span style={styles.pin} title="Pinned">📌</span>}
      </div>
      
      <p style={styles.content}>
        {note.content}
      </p>
      
      <div style={styles.metaRow}>
        <div style={styles.tagsContainer}>
          <span style={styles.category}>{note.category || 'General'}</span>
          {note.tags && note.tags.length > 0 && note.tags.map((tag, idx) => (
            <span key={idx} style={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <span style={styles.date}>{date}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '1.25rem',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '240px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    outline: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
    gap: '0.5rem'
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  pin: {
    fontSize: '0.9rem',
    flexShrink: 0
  },
  content: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    flexGrow: 1,
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    lineHeight: 1.5,
    marginBottom: '0.75rem'
  },
  metaRow: {
    marginBottom: '0.75rem',
    overflow: 'hidden'
  },
  tagsContainer: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  category: {
    fontSize: '0.75rem',
    padding: '0.2rem 0.6rem',
    backgroundColor: 'var(--border-color)',
    color: 'var(--text-primary)',
    borderRadius: '12px',
    fontWeight: '500'
  },
  tag: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    padding: '0.2rem 0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid var(--border-color)'
  },
  date: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  }
};

export default NoteCard;
