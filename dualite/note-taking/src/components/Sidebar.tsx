import React, { useState } from 'react';
import { Search, Plus, Star, FileText, Trash2, Menu, X } from 'lucide-react';
import { Note } from '../types/note';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  notes,
  activeNoteId,
  onNoteSelect,
  onCreateNote,
  onDeleteNote,
  onToggleFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteNotes = filteredNotes.filter(note => note.isFavorite);
  const regularNotes = filteredNotes.filter(note => !note.isFavorite);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const NoteItem: React.FC<{ note: Note }> = ({ note }) => (
    <div
      className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-pitch-hover backdrop-blur-sm border border-transparent hover:border-pitch-border ${
        activeNoteId === note.id ? 'bg-pitch-light border-elegant-silver/20 shadow-lg shadow-elegant-silver/5' : ''
      }`}
      onClick={() => {
        onNoteSelect(note.id);
        setIsMobileOpen(false);
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-elegant-white truncate font-serif leading-relaxed">
            {note.title || 'Untitled'}
          </h3>
          <p className="text-xs text-elegant-muted mt-2 line-clamp-3 leading-relaxed">
            {note.content.slice(0, 120) || 'No content'}
          </p>
          <p className="text-xs text-elegant-dim mt-3 font-mono">
            {formatDate(note.updatedAt)}
          </p>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(note.id);
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              note.isFavorite ? 'text-yellow-400 bg-yellow-400/10' : 'text-elegant-muted hover:text-elegant-white hover:bg-pitch-hover'
            }`}
          >
            <Star size={14} fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
            className="p-2 rounded-lg text-elegant-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-pitch-black border-r border-pitch-border backdrop-blur-xl">
      <!-- Header -->
      <div className="p-6 border-b border-pitch-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-elegant-white font-serif tracking-wide">NoteDark</h1>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-xl hover:bg-pitch-hover text-elegant-muted hover:text-elegant-white transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <!-- Search -->
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-elegant-muted" size={16} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-pitch-dark border border-pitch-border rounded-xl text-sm text-elegant-white placeholder-elegant-dim focus:outline-none focus:ring-2 focus:ring-elegant-silver/30 focus:border-elegant-silver/30 transition-all duration-200"
          />
        </div>
        
        <!-- New Note Button -->
        <button
          onClick={onCreateNote}
          className="w-full mt-4 flex items-center justify-center space-x-2 py-3 px-4 bg-elegant-white text-pitch-black hover:bg-elegant-cream font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus size={16} />
          <span className="font-serif">New Note</span>
        </button>
      </div>

      <!-- Notes List -->
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-pitch-border scrollbar-track-transparent">
        {favoriteNotes.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Star size={16} className="text-yellow-400" />
              <h2 className="text-sm font-medium text-elegant-white font-serif">Favorites</h2>
            </div>
            <div className="space-y-3">
              {favoriteNotes.map(note => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {regularNotes.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <FileText size={16} className="text-elegant-muted" />
              <h2 className="text-sm font-medium text-elegant-white font-serif">All Notes</h2>
            </div>
            <div className="space-y-3">
              {regularNotes.map(note => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <FileText size={64} className="mx-auto text-elegant-dim mb-6 opacity-50" />
            <p className="text-elegant-muted font-serif text-lg">No notes found</p>
            {searchTerm && (
              <p className="text-elegant-dim text-sm mt-3 font-mono">
                Try adjusting your search terms
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <!-- Mobile menu button -->
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 bg-pitch-black/90 backdrop-blur-lg rounded-xl text-elegant-white hover:bg-pitch-hover transition-all duration-200 border border-pitch-border shadow-lg"
      >
        <Menu size={20} />
      </button>

      <!-- Mobile overlay -->
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-pitch-black/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
      )}

      <!-- Sidebar -->
      <div className={`
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 fixed md:relative z-40 w-80 h-full transition-transform duration-300
      `}>
        {sidebarContent}
      </div>
    </>
  );
};
