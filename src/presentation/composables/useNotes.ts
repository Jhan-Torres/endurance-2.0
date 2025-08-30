import { ref, computed } from "vue";
import type { Note } from "../../domain/entities";
import { serviceContainer } from "../../infrastructure/services";

export function useNotes() {
  const notes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const noteUseCases = serviceContainer.getNoteUseCases();

  // Load all notes
  const loadNotes = async () => {
    loading.value = true;
    error.value = null;
    try {
      notes.value = await noteUseCases.getAllNotes();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to load notes";
    } finally {
      loading.value = false;
    }
  };

  // Search notes
  const searchNotes = async (query: string) => {
    if (!query.trim()) {
      await loadNotes();
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      notes.value = await noteUseCases.searchNotes(query);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to search notes";
    } finally {
      loading.value = false;
    }
  };

  // Create note
  const createNote = async (
    noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const newNote = await noteUseCases.createNote(noteData);
      notes.value.push(newNote);
      return newNote;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to create note";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update note
  const updateNote = async (id: string, updates: Partial<Note>) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedNote = await noteUseCases.updateNote(id, updates);
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      return updatedNote;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to update note";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete note
  const deleteNote = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await noteUseCases.deleteNote(id);
      notes.value = notes.value.filter((n) => n.id !== id);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete note";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Toggle pin
  const togglePin = async (id: string) => {
    try {
      const updatedNote = await noteUseCases.toggleNotePin(id);
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      return updatedNote;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to toggle pin";
      throw err;
    }
  };

  // Add tag
  const addTag = async (id: string, tag: string) => {
    try {
      const updatedNote = await noteUseCases.addTagToNote(id, tag);
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      return updatedNote;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to add tag";
      throw err;
    }
  };

  // Remove tag
  const removeTag = async (id: string, tag: string) => {
    try {
      const updatedNote = await noteUseCases.removeTagFromNote(id, tag);
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      return updatedNote;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to remove tag";
      throw err;
    }
  };

  // Extract tags from content
  const extractTags = (content: string): string[] => {
    return noteUseCases.extractTags(content);
  };

  // Computed properties
  const sortedNotes = computed(() => {
    return [...notes.value].sort((a, b) => {
      // Pinned notes first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then sort by update date (newest first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  });

  const pinnedNotes = computed(() => {
    return notes.value.filter((note) => note.isPinned);
  });

  const unpinnedNotes = computed(() => {
    return notes.value.filter((note) => !note.isPinned);
  });

  const noteCategories = computed(() => {
    const categories = new Set(
      notes.value.map((n) => n.category).filter(Boolean)
    );
    return Array.from(categories);
  });

  const allTags = computed(() => {
    const tags = new Set(notes.value.flatMap((n) => n.tags));
    return Array.from(tags);
  });

  return {
    notes: sortedNotes,
    pinnedNotes,
    unpinnedNotes,
    loading,
    error,
    noteCategories,
    allTags,
    loadNotes,
    searchNotes,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    addTag,
    removeTag,
    extractTags,
  };
}
