// Tipos y estado local de notas
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  selectedNote: Note | null;
}
