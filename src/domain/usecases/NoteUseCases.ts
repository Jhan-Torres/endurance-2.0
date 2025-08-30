import type { Note } from "../entities";
import type { NoteRepository } from "../repositories";

export class NoteUseCases {
  constructor(private noteRepository: NoteRepository) {}

  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepository.findAll();
  }

  async getNoteById(id: string): Promise<Note | null> {
    return await this.noteRepository.findById(id);
  }

  async getPinnedNotes(): Promise<Note[]> {
    return await this.noteRepository.findPinned();
  }

  async getNotesByCategory(category: string): Promise<Note[]> {
    return await this.noteRepository.findByCategory(category);
  }

  async searchNotes(query: string): Promise<Note[]> {
    return await this.noteRepository.search(query);
  }

  async createNote(
    noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
  ): Promise<Note> {
    const note: Note = {
      ...noteData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.noteRepository.save(note);
  }

  async updateNote(id: string, updates: Partial<Note>): Promise<Note> {
    return await this.noteRepository.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async deleteNote(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }

  async toggleNotePin(id: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new Error("Note not found");
    }
    return await this.noteRepository.update(id, {
      isPinned: !note.isPinned,
      updatedAt: new Date(),
    });
  }

  async addTagToNote(id: string, tag: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new Error("Note not found");
    }
    const updatedTags = [...new Set([...note.tags, tag])];
    return await this.noteRepository.update(id, {
      tags: updatedTags,
      updatedAt: new Date(),
    });
  }

  async removeTagFromNote(id: string, tag: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new Error("Note not found");
    }
    const updatedTags = note.tags.filter((t) => t !== tag);
    return await this.noteRepository.update(id, {
      tags: updatedTags,
      updatedAt: new Date(),
    });
  }

  extractTags(content: string): string[] {
    const tagRegex = /#(\w+)/g;
    const matches = content.match(tagRegex);
    return matches ? matches.map((tag) => tag.slice(1)) : [];
  }

  private generateId(): string {
    return (
      "note_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  }
}
