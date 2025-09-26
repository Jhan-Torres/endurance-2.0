// Personal Info API Service using shared types
import type {
  PersonalInfo,
  CreatePersonalInfoRequest,
  UpdatePersonalInfoRequest,
  PersonalInfoSearchQuery,
  PersonalInfoResponse,
  ApiResponse,
} from "@endurance/shared-types";

export class PersonalInfoApiService {
  private baseUrl = "/api/personal-info";

  async getPersonalInfo(
    query?: PersonalInfoSearchQuery
  ): Promise<PersonalInfoResponse> {
    const params = new URLSearchParams();
    if (query?.userId) params.append("userId", query.userId);
    if (query?.search) params.append("search", query.search);

    const response = await fetch(`${this.baseUrl}?${params}`);
    const result: ApiResponse<PersonalInfoResponse> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch personal info");
    }

    return result.data;
  }

  async getPersonalInfoById(id: string): Promise<PersonalInfo> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const result: ApiResponse<PersonalInfo> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch personal info");
    }

    return result.data;
  }

  async createPersonalInfo(
    data: CreatePersonalInfoRequest
  ): Promise<PersonalInfo> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<PersonalInfo> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to create personal info");
    }

    return result.data;
  }

  async updatePersonalInfo(
    data: UpdatePersonalInfoRequest
  ): Promise<PersonalInfo> {
    const response = await fetch(`${this.baseUrl}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<PersonalInfo> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to update personal info");
    }

    return result.data;
  }

  async deletePersonalInfo(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    const result: ApiResponse<void> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to delete personal info");
    }
  }

  // Helper method to generate autocomplete data for forms
  async getAutocompleteData(userId: string): Promise<PersonalInfo | null> {
    try {
      const response = await this.getPersonalInfo({ userId });
      return response.personalInfo.length > 0 ? response.personalInfo[0] : null;
    } catch (error) {
      console.error("Failed to get autocomplete data:", error);
      return null;
    }
  }
}
