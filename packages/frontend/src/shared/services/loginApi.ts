// API Service using shared types - example implementation
import type {
  Login,
  CreateLoginRequest,
  UpdateLoginRequest,
  LoginSearchQuery,
  LoginsResponse,
  ApiResponse,
} from "@endurance/shared-types";

export class LoginApiService {
  private baseUrl = "/api/logins";

  async getLogins(query?: LoginSearchQuery): Promise<LoginsResponse> {
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.collection) params.append("collection", query.collection);
    if (query?.website) params.append("website", query.website);
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());

    const response = await fetch(`${this.baseUrl}?${params}`);
    const result: ApiResponse<LoginsResponse> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch logins");
    }

    return result.data;
  }

  async createLogin(request: CreateLoginRequest): Promise<Login> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const result: ApiResponse<Login> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to create login");
    }

    return result.data;
  }

  async updateLogin(request: UpdateLoginRequest): Promise<Login> {
    const { id, ...updateData } = request;

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const result: ApiResponse<Login> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to update login");
    }

    return result.data;
  }

  async deleteLogin(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    const result: ApiResponse<{ success: boolean }> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to delete login");
    }
  }

  async getLoginById(id: string): Promise<Login> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const result: ApiResponse<Login> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch login");
    }

    return result.data;
  }
}
