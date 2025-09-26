import { ref, computed } from "vue";
import { PersonalInfoApiService } from "../services/personalInfoService";
import type { 
  PersonalInfo, 
  CreatePersonalInfoRequest, 
  UpdatePersonalInfoRequest,
  PhoneNumber,
  EmailAddress 
} from "@endurance/shared-types";

const personalInfoService = new PersonalInfoApiService();

// Global personal info state
const personalInfo = ref<PersonalInfo | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export const usePersonalInfo = () => {
  const loadPersonalInfo = async (userId?: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await personalInfoService.getPersonalInfo({ userId });
      personalInfo.value = response.personalInfo.length > 0 ? response.personalInfo[0] : null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load personal info';
      console.error("Failed to load personal info:", err);
    } finally {
      loading.value = false;
    }
  };

  const createPersonalInfo = async (data: CreatePersonalInfoRequest): Promise<PersonalInfo | null> => {
    loading.value = true;
    error.value = null;
    
    try {
      const newPersonalInfo = await personalInfoService.createPersonalInfo(data);
      personalInfo.value = newPersonalInfo;
      return newPersonalInfo;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create personal info';
      console.error("Failed to create personal info:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updatePersonalInfo = async (data: UpdatePersonalInfoRequest): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    
    try {
      const updatedPersonalInfo = await personalInfoService.updatePersonalInfo(data);
      personalInfo.value = updatedPersonalInfo;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update personal info';
      console.error("Failed to update personal info:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deletePersonalInfo = async (id: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    
    try {
      await personalInfoService.deletePersonalInfo(id);
      personalInfo.value = null;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete personal info';
      console.error("Failed to delete personal info:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Helper function to get autocomplete data for forms
  const getAutocompleteData = async (userId: string): Promise<PersonalInfo | null> => {
    try {
      return await personalInfoService.getAutocompleteData(userId);
    } catch (err) {
      console.error("Failed to get autocomplete data:", err);
      return null;
    }
  };

  // Computed properties
  const hasPersonalInfo = computed(() => personalInfo.value !== null);
  const primaryPhone = computed(() => 
    personalInfo.value?.phoneNumbers.find(phone => phone.isPrimary)?.number || ''
  );
  const primaryEmail = computed(() => 
    personalInfo.value?.emails.find(email => email.isPrimary)?.email || ''
  );
  const fullName = computed(() => 
    personalInfo.value ? `${personalInfo.value.firstName} ${personalInfo.value.lastName}` : ''
  );
  const fullAddress = computed(() => {
    if (!personalInfo.value?.address) return '';
    const addr = personalInfo.value.address;
    return `${addr.street}${addr.street2 ? ', ' + addr.street2 : ''}, ${addr.city}${addr.state ? ', ' + addr.state : ''} ${addr.zipCode}, ${addr.country}`;
  });

  // Helper functions for managing phone numbers and emails
  const addPhoneNumber = (type: PhoneNumber['type'] = 'mobile', isPrimary = false): PhoneNumber => {
    return {
      id: crypto.randomUUID(),
      type,
      number: '',
      countryCode: '+1',
      isPrimary
    };
  };

  const addEmail = (type: EmailAddress['type'] = 'personal', isPrimary = false): EmailAddress => {
    return {
      id: crypto.randomUUID(),
      type,
      email: '',
      isPrimary
    };
  };

  return {
    // State
    personalInfo: computed(() => personalInfo.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    
    // Computed
    hasPersonalInfo,
    primaryPhone,
    primaryEmail,
    fullName,
    fullAddress,
    
    // Actions
    loadPersonalInfo,
    createPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
    getAutocompleteData,
    
    // Helpers
    addPhoneNumber,
    addEmail
  };
};
