// Re-export shared types and add frontend-specific state
export type {
  PersonalInfo,
  PersonalInfoState,
  CreatePersonalInfoRequest,
  UpdatePersonalInfoRequest,
  PersonalInfoSearchQuery,
  PersonalInfoResponse,
  PhoneNumber,
  EmailAddress,
  Address,
} from "@endurance/shared-types";

// Frontend-specific UI state
import type { PersonalInfoState, PersonalInfo } from "@endurance/shared-types";

export interface PersonalInfoUIState extends PersonalInfoState {
  isCreating: boolean;
  isEditing: boolean;
  showCreateModal: boolean;
  showEditModal: boolean;
  searchQuery: string;
  selectedPersonalInfo: PersonalInfo | null;
}

// Form-specific types
export interface PersonalInfoFormState {
  firstName: string;
  lastName: string;
  phoneNumbers: Array<{
    type: 'home' | 'work' | 'mobile' | 'other';
    number: string;
    countryCode: string;
    isPrimary: boolean;
  }>;
  emails: Array<{
    type: 'personal' | 'work' | 'other';
    email: string;
    isPrimary: boolean;
  }>;
  address: {
    street: string;
    street2?: string;
    city: string;
    state?: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  nationality?: string;
  occupation?: string;
  company?: string;
  website?: string;
}
