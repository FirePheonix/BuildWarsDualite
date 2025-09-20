import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { useNotes } from './hooks/useNotes';

function App() {
  const {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
  } = useNotes();

  return (
    <div className="h-screen flex bg-pitch-black text-elegant-white overflow-hidden font-sans antialiased">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onNoteSelect={setActiveNoteId}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        onToggleFavorite={toggleFavorite}
      />
      <Editor
        note={activeNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
