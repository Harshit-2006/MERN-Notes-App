import React, { useState, useEffect } from 'react';

const NoteEditor = ({ note, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCategory(note.category || 'General');
      setTags(note.tags ? note.tags.join(', ') : '');
      setIsPinned(note.isPinned || false);
    } else {
      setTitle('');
      setContent('');
      setCategory('General');
      setTags('');
      setIsPinned(false);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      setValidationError('Title is required.');
      return;
    }
    if (trimmedTitle.length > 120) {
      setValidationError('Title cannot exceed 120 characters.');
      return;
    }
    if (!trimmedContent) {
      setValidationError('Content is required.');
      return;
    }

    setValidationError('');

    const tagsArray = tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    onSave({
      _id: note ? note._id : undefined,
      title: trimmedTitle,
      content: trimmedContent,
      category: category.trim() || 'General',
      tags: tagsArray,
      isPinned
    });
  };

  const handleDeleteClick = () => {
    if (deleteConfirm) {
      onDelete(note._id);
    } else {
      setDeleteConfirm(true);
    }
  };

  return (
    <div style={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div style={styles.header}>
          <h2 id="modal-title" style={styles.modalTitle}>{note ? 'Edit Note' : 'New Note'}</h2>
          <button style={styles.closeButton} onClick={onCancel} aria-label="Close editor">×</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {validationError && (
            <div style={styles.errorText} role="alert">{validationError}</div>
          )}

          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (validationError) setValidationError('');
              }}
              style={styles.input}
              maxLength={120}
              autoFocus
              aria-label="Note title"
            />
            <div style={styles.charCount}>
              {title.length} / 120
            </div>
          </div>
          
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (validationError) setValidationError('');
            }}
            style={styles.textarea}
            aria-label="Note content"
          />

          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="category-input">Category</label>
              <input
                id="category-input"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.inputSmall}
                placeholder="General"
              />
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="tags-input">Tags (comma separated)</label>
              <input
                id="tags-input"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                style={styles.inputSmall}
                placeholder="e.g. react, setup, todo"
              />
            </div>
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="pinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
            />
            <label htmlFor="pinned" style={styles.checkboxLabel}>Pin this note</label>
          </div>

          <div style={styles.actions}>
            {note && (
              <div style={styles.deleteWrapper}>
                <button 
                  type="button" 
                  onClick={handleDeleteClick} 
                  style={deleteConfirm ? styles.deleteConfirmButton : styles.deleteButton}
                >
                  {deleteConfirm ? 'Confirm Delete' : 'Delete'}
                </button>
                {deleteConfirm && (
                  <button 
                    type="button" 
                    onClick={() => setDeleteConfirm(false)} 
                    style={styles.cancelDeleteButton}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
            
            {!note && <div></div>}

            <div style={styles.rightActions}>
              <button type="button" onClick={onCancel} style={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" style={styles.saveButton}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modal: {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '650px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  closeButton: {
    fontSize: '1.5rem',
    color: 'var(--text-secondary)',
    lineHeight: 1,
  },
  form: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto',
  },
  errorText: {
    color: 'var(--danger-color)',
    fontSize: '0.85rem',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: '0.5rem 0.8rem',
    borderRadius: '4px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)'
  },
  input: {
    padding: '0.8rem',
    fontSize: '1.1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    fontWeight: '500',
    outline: 'none',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    minHeight: '220px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.5
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  fieldGroup: {
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  inputSmall: {
    padding: '0.6rem',
    fontSize: '0.9rem',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    outline: 'none',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border-color)',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  deleteWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  rightActions: {
    display: 'flex',
    gap: '0.75rem',
    marginLeft: 'auto',
  },
  cancelButton: {
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
  },
  saveButton: {
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-surface)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  deleteButton: {
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--danger-color)',
    border: '1px solid var(--danger-color)',
    fontSize: '0.9rem',
  },
  deleteConfirmButton: {
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    backgroundColor: 'var(--danger-color)',
    color: 'white',
    border: '1px solid var(--danger-color)',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  cancelDeleteButton: {
    padding: '0.6rem 0.8rem',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
  }
};

export default NoteEditor;
