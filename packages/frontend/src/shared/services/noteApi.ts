// Note API Service using shared types
import type {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  NoteSearchQuery,
  NotesResponse,
  ApiResponse,
} from "@endurance/shared-types";

export class NoteApiService {
  private baseUrl = "/api/notes";

  async getNotes(query?: NoteSearchQuery): Promise<NotesResponse> {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.tags) params.append("tags", query.tags.join(","));
    if (query?.dateFrom)
      params.append("dateFrom", query.dateFrom.toISOString());
    if (query?.dateTo) params.append("dateTo", query.dateTo.toISOString());
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());

    const response = await fetch(`${this.baseUrl}?${params}`);
    const result: ApiResponse<NotesResponse> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch notes");
    }

    return result.data;
  }

  async createNote(request: CreateNoteRequest): Promise<Note> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const result: ApiResponse<Note> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to create note");
    }

    return result.data;
  }

  async updateNote(request: UpdateNoteRequest): Promise<Note> {
    const { id, ...updateData } = request;

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const result: ApiResponse<Note> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to update note");
    }

    return result.data;
  }

  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    const result: ApiResponse<{ success: boolean }> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to delete note");
    }
  }

  async getNoteById(id: string): Promise<Note> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const result: ApiResponse<Note> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch note");
    }

    return result.data;
  }
}
