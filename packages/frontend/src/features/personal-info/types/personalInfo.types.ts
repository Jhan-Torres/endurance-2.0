export interface PersonalInfo {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumbers: PhoneNumber[];
  emails: EmailAddress[];
  address: Address;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  nationality?: string;
  occupation?: string;
  company?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhoneNumber {
  id: string;
  type: 'home' | 'work' | 'mobile' | 'other';
  number: string;
  countryCode: string;
  isPrimary: boolean;
}

export interface EmailAddress {
  id: string;
  type: 'personal' | 'work' | 'other';
  email: string;
  isPrimary: boolean;
}

export interface Address {
  street: string;
  street2?: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
}

export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  phoneNumbers: Omit<PhoneNumber, 'id'>[];
  emails: Omit<EmailAddress, 'id'>[];
  address: Address;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  nationality?: string;
  occupation?: string;
  company?: string;
  website?: string;
}

export interface CreatePersonalInfoRequest extends PersonalInfoFormData {}

export interface UpdatePersonalInfoRequest extends Partial<PersonalInfoFormData> {
  id: string;
}

export interface PersonalInfoSearchQuery {
  userId?: string;
  search?: string;
}

export interface PersonalInfoResponse {
  personalInfo: PersonalInfo[];
  total: number;
}
