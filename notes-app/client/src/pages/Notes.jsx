import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import NoteGrid from '../components/NoteGrid';
import NoteEditor from '../components/NoteEditor';
import * as noteService from '../services/noteService';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await noteService.getNotes();
      if (response.success) {
        setNotes(response.data);
      }
    } catch (err) {
      setError('Unable to load your notes. Check that the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      setError(null);
      if (noteData._id) {
        // Update
        const response = await noteService.updateNote(noteData._id, noteData);
        if (response.success) {
          // Re-sort handled gracefully by re-fetching, or simple local update.
          // For perfection on pinning/sorting, re-fetching is safest to respect backend logic.
          await fetchNotes(); 
        }
      } else {
        // Create
        const response = await noteService.createNote(noteData);
        if (response.success) {
          await fetchNotes();
        }
      }
      closeEditor();
    } catch (err) {
      setError('Failed to save note. Please try again.');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setError(null);
      const response = await noteService.deleteNote(id);
      if (response.success) {
        setNotes(prev => prev.filter(n => n._id !== id));
        closeEditor();
      }
    } catch (err) {
      setError('Failed to delete note. Please try again.');
    }
  };

  const openNewNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  // Derive categories from notes
  const categories = useMemo(() => {
    const cats = new Set(notes.map(n => n.category || 'General'));
    return ['All', ...Array.from(cats)].sort();
  }, [notes]);

  // Filter notes based on search and category
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesCategory = activeCategory === 'All' || note.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      
      const tagMatch = note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchLower));
      const titleMatch = note.title && note.title.toLowerCase().includes(searchLower);
      const contentMatch = note.content && note.content.toLowerCase().includes(searchLower);
      const categoryMatch = note.category && note.category.toLowerCase().includes(searchLower);
      
      const matchesSearch = titleMatch || contentMatch || tagMatch || categoryMatch;
      
      return matchesCategory && matchesSearch;
    });
  }, [notes, activeCategory, searchQuery]);

  // Render correct empty state based on conditions
  const renderEmptyState = () => {
    if (notes.length === 0) {
      return (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No notes yet.</p>
          <button style={styles.emptyButton} onClick={openNewNote}>
            Create your first note
          </button>
        </div>
      );
    }
    
    if (searchQuery && filteredNotes.length === 0) {
      return (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No notes found.</p>
          <button style={styles.emptyButton} onClick={() => setSearchQuery('')}>
            Clear search
          </button>
        </div>
      );
    }

    if (activeCategory !== 'All' && filteredNotes.length === 0) {
      return (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No notes in this category.</p>
          <button style={styles.emptyButton} onClick={() => setActiveCategory('All')}>
            Clear filter
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container">
      <Header onNewNote={openNewNote} noteCount={notes.length} />
      
      <main>
        {error && <div style={styles.errorBanner} role="alert">{error}</div>}
        
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        {loading ? (
          <div style={styles.loading}>Loading notes...</div>
        ) : filteredNotes.length === 0 ? (
          renderEmptyState()
        ) : (
          <NoteGrid notes={filteredNotes} onNoteClick={openEditNote} />
        )}
      </main>

      {isEditorOpen && (
        <NoteEditor 
          note={editingNote} 
          onSave={handleSaveNote} 
          onCancel={closeEditor}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
};

const styles = {
  loading: {
    textAlign: 'center',
    padding: '3rem 0',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  errorBanner: {
    backgroundColor: 'var(--danger-color)',
    color: 'white',
    padding: '0.8rem 1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  emptyState: {
    textAlign: 'center',
    padding: '5rem 1rem',
    border: '1px dashed var(--border-color)',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-surface)',
    marginTop: '2rem'
  },
  emptyText: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  emptyButton: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-surface)',
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'opacity 0.2s'
  }
};

export default Notes;
