import { ref, computed } from "vue";
import { NoteService } from "../services/noteService";
import type { Note, NoteFormData } from "../types/note.types";

const noteService = new NoteService();

// Global notes state
const notes = ref<Note[]>([]);
const loading = ref(false);

export const useNotes = () => {
  const loadNotes = () => {
    loading.value = true;
    try {
      notes.value = noteService.getAll();
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      loading.value = false;
    }
  };

  const addNote = (noteData: NoteFormData): Note => {
    const newNote = noteService.save(noteData);
    notes.value.push(newNote);
    return newNote;
  };

  const updateNote = (id: string, noteData: Partial<NoteFormData>): boolean => {
    const updatedNote = noteService.update(id, noteData);
    if (updatedNote) {
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      return true;
    }
    return false;
  };

  const deleteNote = (id: string): boolean => {
    const success = noteService.delete(id);
    if (success) {
      notes.value = notes.value.filter((n) => n.id !== id);
    }
    return success;
  };

  const searchNotes = (query: string) => {
    if (!query.trim()) return notes.value;

    const lowercaseQuery = query.toLowerCase();
    return notes.value.filter(
      (note) =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery) ||
        note.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    notes: computed(() => notes.value),
    loading: computed(() => loading.value),
    loadNotes,
    addNote,
    updateNote,
    deleteNote,
    searchNotes,
  };
};
