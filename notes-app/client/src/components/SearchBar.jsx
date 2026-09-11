import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
          aria-label="Search notes"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={styles.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '1.5rem',
    width: '100%'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    width: '100%',
    padding: '0.8rem 2.5rem 0.8rem 1rem',
    fontSize: '1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  clearButton: {
    position: 'absolute',
    right: '0.5rem',
    padding: '0.2rem 0.5rem',
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    borderRadius: '50%',
    transition: 'color 0.2s',
  }
};

export default SearchBar;
