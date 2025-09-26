// Personal Info business logic and use cases
import { PersonalInfo, CreatePersonalInfoRequest, UpdatePersonalInfoRequest } from "./model";

export const getPersonalInfo = async (userId: string): Promise<PersonalInfo[]> => {
  // Get personal info logic here - this would typically call the API
  // For now, returning empty array as placeholder
  return [];
};

export const createPersonalInfo = async (
  data: CreatePersonalInfoRequest
): Promise<PersonalInfo> => {
  // Create personal info logic here
  const now = new Date();
  
  // Add IDs to phone numbers and emails
  const phoneNumbersWithIds = data.phoneNumbers.map(phone => ({
    ...phone,
    id: crypto.randomUUID()
  }));
  
  const emailsWithIds = data.emails.map(email => ({
    ...email,
    id: crypto.randomUUID()
  }));
  
  return {
    id: crypto.randomUUID(),
    userId: "current-user-id", // This would come from auth context
    ...data,
    phoneNumbers: phoneNumbersWithIds,
    emails: emailsWithIds,
    createdAt: now,
    updatedAt: now,
  };
};

export const updatePersonalInfo = async (
  id: string,
  updates: UpdatePersonalInfoRequest
): Promise<PersonalInfo> => {
  // Update personal info logic here
  const now = new Date();
  
  // Add IDs to phone numbers and emails if they don't have them
  const phoneNumbersWithIds = updates.phoneNumbers?.map(phone => ({
    ...phone,
    id: crypto.randomUUID()
  })) || [];
  
  const emailsWithIds = updates.emails?.map(email => ({
    ...email,
    id: crypto.randomUUID()
  })) || [];
  
  // This would typically:
  // 1. Fetch existing personal info
  // 2. Merge with updates
  // 3. Validate data
  // 4. Save to backend
  
  return {
    id,
    userId: "current-user-id",
    firstName: updates.firstName || "",
    lastName: updates.lastName || "",
    phoneNumbers: phoneNumbersWithIds,
    emails: emailsWithIds,
    address: updates.address || {
      street: "",
      city: "",
      zipCode: "",
      country: ""
    },
    dateOfBirth: updates.dateOfBirth,
    gender: updates.gender,
    nationality: updates.nationality,
    occupation: updates.occupation,
    company: updates.company,
    website: updates.website,
    createdAt: new Date("2024-01-01"), // Would come from existing data
    updatedAt: now,
  };
};

export const deletePersonalInfo = async (id: string): Promise<void> => {
  // Delete personal info logic here
  // This would typically call the API to delete the record
  console.log(`Deleting personal info with id: ${id}`);
};

// Validation helpers
export const validatePersonalInfo = (data: CreatePersonalInfoRequest): string[] => {
  const errors: string[] = [];
  
  if (!data.firstName.trim()) {
    errors.push("First name is required");
  }
  
  if (!data.lastName.trim()) {
    errors.push("Last name is required");
  }
  
  if (!data.address.street.trim()) {
    errors.push("Street address is required");
  }
  
  if (!data.address.city.trim()) {
    errors.push("City is required");
  }
  
  if (!data.address.zipCode.trim()) {
    errors.push("ZIP code is required");
  }
  
  if (!data.address.country.trim()) {
    errors.push("Country is required");
  }
  
  // Validate phone numbers
  data.phoneNumbers.forEach((phone, index) => {
    if (phone.number && !phone.number.match(/^[\+]?[1-9][\d]{0,15}$/)) {
      errors.push(`Phone number ${index + 1} is invalid`);
    }
  });
  
  // Validate emails
  data.emails.forEach((emailObj, index) => {
    if (emailObj.email && !emailObj.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push(`Email ${index + 1} is invalid`);
    }
  });
  
  // Validate website if provided
  if (data.website && data.website.trim()) {
    try {
      new URL(data.website.startsWith('http') ? data.website : `https://${data.website}`);
    } catch {
      errors.push("Website URL is invalid");
    }
  }
  
  return errors;
};

// Helper function to format phone number for display
export const formatPhoneNumber = (phone: string, countryCode: string): string => {
  // Basic formatting - could be enhanced with proper phone number libraries
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${countryCode} (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return `${countryCode} ${phone}`;
};

// Helper function to get primary contact info
export const getPrimaryContact = (personalInfo: PersonalInfo) => {
  const primaryPhone = personalInfo.phoneNumbers.find(p => p.isPrimary) || personalInfo.phoneNumbers[0];
  const primaryEmail = personalInfo.emails.find(e => e.isPrimary) || personalInfo.emails[0];
  
  return {
    phone: primaryPhone ? formatPhoneNumber(primaryPhone.number, primaryPhone.countryCode) : null,
    email: primaryEmail?.email || null
  };
};
