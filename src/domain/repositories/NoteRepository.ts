import type { Note } from "../entities/Note";

export interface NoteRepository {
  findAll(): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  findByCategory(category: string): Promise<Note[]>;
  findPinned(): Promise<Note[]>;
  search(query: string): Promise<Note[]>;
  save(note: Note): Promise<Note>;
  update(id: string, note: Partial<Note>): Promise<Note>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
