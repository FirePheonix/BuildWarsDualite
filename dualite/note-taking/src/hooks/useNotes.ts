import { useState, useEffect } from 'react';
import { Note } from '../types/note';

const STORAGE_KEY = 'notedark-notes';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setActiveNoteId(parsedNotes[0].id);
      }
    } else {
      // Create a welcome note if no notes exist
      const welcomeNote: Note = {
        id: '1',
        title: 'Welcome to NoteDark',
        content: 'Start typing here to create your first note...\n\nThis is a beautiful dark mode note-taking app inspired by Notion.',
        createdAt: new Date(),
        updatedAt: new Date(),
        isFavorite: false,
      };
      setNotes([welcomeNote]);
      setActiveNoteId(welcomeNote.id);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  const createNote = (): Note => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: false,
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => {
      const filtered = prev.filter(note => note.id !== id);
      if (activeNoteId === id && filtered.length > 0) {
        setActiveNoteId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveNoteId(null);
      }
      return filtered;
    });
  };

  const toggleFavorite = (id: string) => {
    updateNote(id, { 
      isFavorite: !notes.find(note => note.id === id)?.isFavorite 
    });
  };

  const activeNote = notes.find(note => note.id === activeNoteId);

  return {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
  };
};
