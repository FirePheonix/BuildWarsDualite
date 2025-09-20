export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export interface NoteBlock {
  id: string;
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulletList' | 'numberedList';
  content: string;
}
