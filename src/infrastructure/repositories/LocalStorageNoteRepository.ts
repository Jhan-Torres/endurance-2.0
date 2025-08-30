import type { Note } from "../../domain/entities";
import type { NoteRepository } from "../../domain/repositories";

export class LocalStorageNoteRepository implements NoteRepository {
  private readonly storageKey = "endurance_notes";

  async findAll(): Promise<Note[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data).map(this.deserialize) : [];
  }

  async findById(id: string): Promise<Note | null> {
    const notes = await this.findAll();
    return notes.find((n) => n.id === id) || null;
  }

  async findByCategory(category: string): Promise<Note[]> {
    const notes = await this.findAll();
    return notes.filter((n) => n.category === category);
  }

  async findPinned(): Promise<Note[]> {
    const notes = await this.findAll();
    return notes.filter((n) => n.isPinned);
  }

  async search(query: string): Promise<Note[]> {
    const notes = await this.findAll();
    const lowerQuery = query.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(lowerQuery) ||
        n.content.toLowerCase().includes(lowerQuery) ||
        n.category?.toLowerCase().includes(lowerQuery) ||
        n.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async save(note: Note): Promise<Note> {
    const notes = await this.findAll();
    notes.push(note);
    this.saveToStorage(notes);
    return note;
  }

  async update(id: string, updates: Partial<Note>): Promise<Note> {
    const notes = await this.findAll();
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new Error("Note not found");
    }
    notes[index] = { ...notes[index], ...updates };
    this.saveToStorage(notes);
    return notes[index];
  }

  async delete(id: string): Promise<void> {
    const notes = await this.findAll();
    const filteredNotes = notes.filter((n) => n.id !== id);
    this.saveToStorage(filteredNotes);
  }

  async exists(id: string): Promise<boolean> {
    const note = await this.findById(id);
    return note !== null;
  }

  private saveToStorage(notes: Note[]): void {
    const serialized = notes.map(this.serialize);
    localStorage.setItem(this.storageKey, JSON.stringify(serialized));
  }

  private serialize(note: Note): any {
    return {
      ...note,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  private deserialize(data: any): Note {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }
}
