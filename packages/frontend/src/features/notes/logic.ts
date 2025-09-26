// Casos de uso de notas
import { Note } from "./model";

export const getNotes = async (): Promise<Note[]> => {
  // Get notes logic here
  return [];
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  // Create note logic here
  const now = new Date();
  return {
    id: Date.now().toString(),
    ...note,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateNote = async (
  id: string,
  updates: Partial<Note>
): Promise<Note> => {
  // Update note logic here
  return {
    id,
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    ...updates,
  };
};

export const deleteNote = async (id: string): Promise<void> => {
  // Delete note logic here
};
