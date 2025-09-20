import React, { useState, useEffect, useRef } from 'react';
import { Star, Trash2, Calendar, Clock } from 'lucide-react';
import { Note } from '../types/note';

interface EditorProps {
  note: Note | undefined;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  note,
  onUpdateNote,
  onDeleteNote,
  onToggleFavorite,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (note) {
      onUpdateNote(note.id, { title: newTitle });
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (note) {
      onUpdateNote(note.id, { content: newContent });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + '    ' + content.substring(end);
      setContent(newContent);
      if (note) {
        onUpdateNote(note.id, { content: newContent });
      }
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-pitch-black">
        <div className="text-center animate-fade-in">
          <div className="text-8xl mb-8 opacity-20">✦</div>
          <h2 className="text-3xl font-semibold text-elegant-white mb-4 font-serif">Welcome to NoteDark</h2>
          <p className="text-elegant-muted text-lg font-serif max-w-md leading-relaxed">
            Select a note from the sidebar or create a new one to begin your elegant writing experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-pitch-black overflow-hidden">
      <!-- Header -->
      <div className="flex items-center justify-between p-8 border-b border-pitch-border bg-pitch-black/90 backdrop-blur-xl">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Calendar size={18} className="text-elegant-muted" />
            <span className="text-sm text-elegant-muted font-mono">
              Last updated: {formatDate(note.updatedAt)}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock size={18} className="text-elegant-dim" />
            <span className="text-sm text-elegant-dim font-mono">
              Created: {formatDate(note.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleFavorite(note.id)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              note.isFavorite 
                ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/20' 
                : 'text-elegant-muted hover:text-elegant-white hover:bg-pitch-hover border border-pitch-border'
            }`}
          >
            <Star size={18} fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onDeleteNote(note.id)}
            className="p-3 rounded-xl text-elegant-muted hover:text-red-400 hover:bg-red-500/10 border border-pitch-border hover:border-red-500/20 transition-all duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <!-- Editor -->
      <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-pitch-border scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <!-- Title -->
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Untitled"
            className="w-full text-5xl font-bold text-elegant-white bg-transparent border-none outline-none placeholder-elegant-dim mb-8 resize-none font-serif leading-tight tracking-wide"
            style={{ lineHeight: '1.1' }}
          />

          <!-- Content -->
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Begin your thoughts here..."
            className="w-full h-96 text-lg text-elegant-cream bg-transparent border-none outline-none placeholder-elegant-dim resize-none leading-loose tracking-wide font-elegant"
            style={{ 
              minHeight: 'calc(100vh - 350px)',
              lineHeight: '1.8'
            }}
          />
        </div>
      </div>

      <!-- Footer -->
      <div className="p-6 border-t border-pitch-border bg-pitch-black/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-elegant-dim">
          <div className="font-mono">
            Word count: {content.split(/\s+/).filter(word => word.length > 0).length} words
          </div>
          <div className="font-mono">
            Characters: {content.length}
          </div>
        </div>
      </div>
    </div>
  );
};
