import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <button
          key={category}
          style={{
            ...styles.button,
            ...(activeCategory === category ? styles.activeButton : {})
          }}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  button: {
    padding: '0.4rem 1rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  activeButton: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-surface)',
    borderColor: 'var(--text-primary)'
  }
};

export default CategoryFilter;
