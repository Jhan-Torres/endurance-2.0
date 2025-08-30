import type { Note, NoteFormData } from "../types/note.types";

export class NoteService {
  private readonly STORAGE_KEY = "endurance_notes";

  getAll(): Note[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  save(noteData: NoteFormData): Note {
    const notes = this.getAll();
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    notes.push(newNote);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
    return newNote;
  }

  update(id: string, noteData: Partial<NoteFormData>): Note | null {
    const notes = this.getAll();
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) return null;

    notes[index] = {
      ...notes[index],
      ...noteData,
      updatedAt: new Date(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
    return notes[index];
  }

  delete(id: string): boolean {
    const notes = this.getAll();
    const filteredNotes = notes.filter((n) => n.id !== id);

    if (filteredNotes.length === notes.length) return false;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredNotes));
    return true;
  }

  findById(id: string): Note | null {
    const notes = this.getAll();
    return notes.find((n) => n.id === id) || null;
  }
}
