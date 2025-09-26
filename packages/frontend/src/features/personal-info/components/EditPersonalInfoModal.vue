<template>
  <!-- Modal Backdrop -->
  <Transition
    name="backdrop"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-gray-500 bg-opacity-75"
      @click="closeModal"
    />
  </Transition>

  <!-- Modal -->
  <Transition
    name="modal"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ isEditing ? 'Edit Personal Information' : 'Add Personal Information' }}
          </h2>
          <button
            @click="closeModal"
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Basic Information Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Basic Information
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="firstName"
                  v-model="formData.firstName"
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  :error="getFieldError('firstName')"
                  required
                />
                <FormInput
                  id="lastName"
                  v-model="formData.lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  :error="getFieldError('lastName')"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    v-model="formData.dateOfBirth"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    v-model="formData.gender"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Phone Numbers Section -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Phone Numbers
                </h3>
                <button
                  type="button"
                  @click="addPhoneNumber"
                  :disabled="formData.phoneNumbers.length >= 2"
                  class="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  + Add Phone
                </button>
              </div>
              
              <div
                v-for="(phone, index) in formData.phoneNumbers"
                :key="index"
                class="flex gap-2 items-start"
              >
                <div class="flex-1">
                  <div class="grid grid-cols-4 gap-2">
                    <select
                      v-model="phone.type"
                      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="mobile">Mobile</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      v-model="phone.countryCode"
                      type="text"
                      placeholder="+1"
                      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      v-model="phone.number"
                      type="tel"
                      placeholder="Phone number"
                      class="col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      :class="{ 'border-red-500': getFieldError(`phoneNumbers.${index}.number`) }"
                    />
                  </div>
                  <div class="flex items-center mt-2">
                    <label class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <input
                        v-model="phone.isPrimary"
                        type="checkbox"
                        @change="handlePrimaryPhoneChange(index)"
                        class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Primary phone
                    </label>
                  </div>
                  <p v-if="getFieldError(`phoneNumbers.${index}.number`)" class="text-red-500 text-sm mt-1">
                    {{ getFieldError(`phoneNumbers.${index}.number`) }}
                  </p>
                </div>
                <button
                  type="button"
                  @click="removePhoneNumber(index)"
                  class="mt-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Email Addresses Section -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Email Addresses
                </h3>
                <button
                  type="button"
                  @click="addEmail"
                  :disabled="formData.emails.length >= 2"
                  class="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  + Add Email
                </button>
              </div>
              
              <div
                v-for="(email, index) in formData.emails"
                :key="index"
                class="flex gap-2 items-start"
              >
                <div class="flex-1">
                  <div class="grid grid-cols-4 gap-2">
                    <select
                      v-model="email.type"
                      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      v-model="email.email"
                      type="email"
                      placeholder="Email address"
                      class="col-span-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      :class="{ 'border-red-500': getFieldError(`emails.${index}.email`) }"
                    />
                  </div>
                  <div class="flex items-center mt-2">
                    <label class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <input
                        v-model="email.isPrimary"
                        type="checkbox"
                        @change="handlePrimaryEmailChange(index)"
                        class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Primary email
                    </label>
                  </div>
                  <p v-if="getFieldError(`emails.${index}.email`)" class="text-red-500 text-sm mt-1">
                    {{ getFieldError(`emails.${index}.email`) }}
                  </p>
                </div>
                <button
                  type="button"
                  @click="removeEmail(index)"
                  class="mt-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Address Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Address
              </h3>
              
              <FormInput
                id="street"
                v-model="formData.address.street"
                label="Street Address"
                type="text"
                placeholder="Enter street address"
                :error="getFieldError('address.street')"
                required
              />
              
              <FormInput
                id="street2"
                v-model="formData.address.street2"
                label="Street Address 2 (Optional)"
                type="text"
                placeholder="Apartment, suite, etc."
              />
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  id="city"
                  v-model="formData.address.city"
                  label="City"
                  type="text"
                  placeholder="Enter city"
                  :error="getFieldError('address.city')"
                  required
                />
                <FormInput
                  id="state"
                  v-model="formData.address.state"
                  label="State/Province"
                  type="text"
                  placeholder="Enter state/province"
                />
                <FormInput
                  id="zipCode"
                  v-model="formData.address.zipCode"
                  label="ZIP/Postal Code"
                  type="text"
                  placeholder="Enter ZIP code"
                  :error="getFieldError('address.zipCode')"
                  required
                />
              </div>
              
              <FormInput
                id="country"
                v-model="formData.address.country"
                label="Country"
                type="text"
                placeholder="Enter country"
                :error="getFieldError('address.country')"
                required
              />
            </div>

            <!-- Professional Information Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Professional Information (Optional)
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="occupation"
                  v-model="formData.occupation"
                  label="Occupation"
                  type="text"
                  placeholder="Enter your occupation"
                />
                <FormInput
                  id="company"
                  v-model="formData.company"
                  label="Company"
                  type="text"
                  placeholder="Enter your company"
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="nationality"
                  v-model="formData.nationality"
                  label="Nationality"
                  type="text"
                  placeholder="Enter your nationality"
                />
                <FormInput
                  id="website"
                  v-model="formData.website"
                  label="Website"
                  type="url"
                  placeholder="https://example.com"
                  :error="getFieldError('website')"
                />
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            @click="handleSubmit"
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { useFormValidation } from "../../../shared/composables";
import { personalInfoModalSchema } from "../../../shared/validation";
import { usePersonalInfo } from "../composables/usePersonalInfo";
import FormInput from "../../../shared/components/FormInput.vue";
import type { PersonalInfo, CreatePersonalInfoRequest } from "@endurance/shared-types";

// Props
interface Props {
  isOpen: boolean;
  personalInfo?: PersonalInfo | null;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  close: [];
  success: [personalInfo: PersonalInfo];
}>();

// Composables
const { createPersonalInfo, updatePersonalInfo } = usePersonalInfo();

// State
const isSubmitting = ref(false);
const isEditing = computed(() => !!props.personalInfo);

// Form data
const formData = reactive<CreatePersonalInfoRequest>({
  firstName: "",
  lastName: "",
  phoneNumbers: [],
  emails: [],
  address: {
    street: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  dateOfBirth: undefined,
  gender: undefined,
  nationality: "",
  occupation: "",
  company: "",
  website: "",
});

// Form validation
const {
  formData: validationFormData,
  errors,
  validateField,
  validateAll,
  isValid,
} = useFormValidation(personalInfoModalSchema);

// Helper function to get field errors
const getFieldError = (field: string) => errors[field];

// Watch for prop changes to populate form
watch(
  () => props.personalInfo,
  (personalInfo) => {
    if (personalInfo) {
      Object.assign(formData, {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phoneNumbers: personalInfo.phoneNumbers.map(phone => ({
          type: phone.type,
          number: phone.number,
          countryCode: phone.countryCode,
          isPrimary: phone.isPrimary
        })),
        emails: personalInfo.emails.map(email => ({
          type: email.type,
          email: email.email,
          isPrimary: email.isPrimary
        })),
        address: { ...personalInfo.address },
        dateOfBirth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        nationality: personalInfo.nationality || "",
        occupation: personalInfo.occupation || "",
        company: personalInfo.company || "",
        website: personalInfo.website || "",
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Methods
const resetForm = () => {
  Object.assign(formData, {
    firstName: "",
    lastName: "",
    phoneNumbers: [],
    emails: [],
    address: {
      street: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    dateOfBirth: undefined,
    gender: undefined,
    nationality: "",
    occupation: "",
    company: "",
    website: "",
  });
};

const closeModal = () => {
  if (!isSubmitting.value) {
    resetForm();
    emit("close");
  }
};

const addPhoneNumber = () => {
  if (formData.phoneNumbers.length < 2) {
    formData.phoneNumbers.push({
      type: 'mobile',
      number: '',
      countryCode: '+1',
      isPrimary: formData.phoneNumbers.length === 0
    });
  }
};

const removePhoneNumber = (index: number) => {
  formData.phoneNumbers.splice(index, 1);
  // If we removed the primary phone, make the first one primary
  if (formData.phoneNumbers.length > 0 && !formData.phoneNumbers.some(p => p.isPrimary)) {
    formData.phoneNumbers[0].isPrimary = true;
  }
};

const handlePrimaryPhoneChange = (index: number) => {
  // Only one phone can be primary
  formData.phoneNumbers.forEach((phone, i) => {
    phone.isPrimary = i === index;
  });
};

const addEmail = () => {
  if (formData.emails.length < 2) {
    formData.emails.push({
      type: 'personal',
      email: '',
      isPrimary: formData.emails.length === 0
    });
  }
};

const removeEmail = (index: number) => {
  formData.emails.splice(index, 1);
  // If we removed the primary email, make the first one primary
  if (formData.emails.length > 0 && !formData.emails.some(e => e.isPrimary)) {
    formData.emails[0].isPrimary = true;
  }
};

const handlePrimaryEmailChange = (index: number) => {
  // Only one email can be primary
  formData.emails.forEach((email, i) => {
    email.isPrimary = i === index;
  });
};

const handleSubmit = async () => {
  if (!validateAll() || isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    let result: PersonalInfo | null = null;

    if (isEditing.value && props.personalInfo) {
      const success = await updatePersonalInfo({
        id: props.personalInfo.id,
        ...formData
      });
      if (success) {
        result = props.personalInfo; // In real app, this would be the updated data
      }
    } else {
      result = await createPersonalInfo(formData);
    }

    if (result) {
      emit("success", result);
      closeModal();
    }
  } catch (error) {
    console.error("Failed to save personal info:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Initialize with at least one phone and email if creating new
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && !isEditing.value) {
    if (formData.phoneNumbers.length === 0) {
      addPhoneNumber();
    }
    if (formData.emails.length === 0) {
      addEmail();
    }
  }
}, { immediate: true });
</script>
