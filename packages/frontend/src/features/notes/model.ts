// Re-export shared types and add frontend-specific state
export type {
  Note,
  NotesState,
  CreateNoteRequest,
  UpdateNoteRequest,
  NoteSearchQuery,
  NotesResponse,
  Tag,
} from "@endurance/shared-types";

// Frontend-specific UI state (if needed)
import type { NotesState } from "@endurance/shared-types";

export interface NotesUIState extends NotesState {
  isCreating: boolean;
  isEditing: boolean;
  showCreateModal: boolean;
  showEditModal: boolean;
  searchQuery: string;
  selectedTags: string[];
}
