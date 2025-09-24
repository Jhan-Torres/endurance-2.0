// Core note types
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isEncrypted?: boolean;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  selectedNote: Note | null;
}

// API request/response types
export interface CreateNoteRequest {
  title: string;
  content: string;
  tags?: string[];
}

export interface UpdateNoteRequest extends Partial<CreateNoteRequest> {
  id: string;
}

export interface NoteSearchQuery {
  search?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  offset?: number;
}

export interface NotesResponse {
  notes: Note[];
  total: number;
  hasMore: boolean;
}

// Tag types
export interface Tag {
  id: string;
  name: string;
  color?: string;
  usageCount: number;
}
