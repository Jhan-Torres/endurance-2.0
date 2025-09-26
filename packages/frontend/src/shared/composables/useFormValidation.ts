import { ref, reactive, computed, watch } from "vue";

export type ValidationRule = (value: any) => string | true;

export interface FieldConfig {
  rules: ValidationRule[];
  required?: boolean;
}

export interface ValidationSchema {
  [key: string]: FieldConfig;
}

export function useFormValidation(schema: ValidationSchema) {
  const formData = reactive<Record<string, any>>({});
  const errors = reactive<Record<string, string>>({});
  const touched = reactive<Record<string, boolean>>({});

  // Initialize form data
  Object.keys(schema).forEach((field) => {
    formData[field] = "";
    errors[field] = "";
    touched[field] = false;
  });

  const validateField = (field: string, value: any) => {
    const fieldConfig = schema[field];
    if (!fieldConfig) return;

    // Mark field as touched
    touched[field] = true;

    // Clear previous error
    errors[field] = "";

    // Check required
    if (fieldConfig.required && (!value || value.toString().trim() === "")) {
      errors[field] = `${field} is required`;
      return;
    }

    // Run validation rules
    for (const rule of fieldConfig.rules) {
      const result = rule(value);
      if (result !== true) {
        errors[field] = result;
        break;
      }
    }
  };

  const validateAll = (): boolean => {
    let isValid = true;

    Object.keys(schema).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
  };

  const reset = () => {
    Object.keys(formData).forEach((key) => {
      formData[key] = "";
      errors[key] = "";
      touched[key] = false;
    });
  };

  const isValid = computed(() => {
    return (
      Object.values(errors).every((error) => !error) &&
      Object.keys(touched).some((key) => touched[key])
    );
  });

  const hasErrors = computed(() => {
    return Object.values(errors).some((error) => error);
  });

  return {
    formData,
    errors,
    touched,
    isValid,
    hasErrors,
    validateField,
    validateAll,
    clearErrors,
    reset,
  };
}

// Common validation rules
export const validationRules = {
  required:
    (message = "This field is required"): ValidationRule =>
    (value: any) =>
      value && value.toString().trim() !== "" ? true : message,

  email:
    (message = "Please enter a valid email address"): ValidationRule =>
    (value: string) => {
      if (!value) return true; // Let required handle empty values
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value.trim()) ? true : message;
    },

  minLength:
    (min: number, message?: string): ValidationRule =>
    (value: string) => {
      if (!value) return true; // Let required handle empty values
      return value.length >= min
        ? true
        : message || `Must be at least ${min} characters`;
    },

  maxLength:
    (max: number, message?: string): ValidationRule =>
    (value: string) => {
      if (!value) return true;
      return value.length <= max
        ? true
        : message || `Cannot exceed ${max} characters`;
    },

  url:
    (message = "Please enter a valid URL"): ValidationRule =>
    (value: string) => {
      if (!value) return true;
      try {
        const url = new URL(value);
        return ["http:", "https:"].includes(url.protocol) ? true : message;
      } catch {
        return message;
      }
    },

  passwordStrength:
    (
      message = "Password must contain uppercase, lowercase, number, and special character"
    ): ValidationRule =>
    (value: string) => {
      if (!value) return true;
      const hasRequirements =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
          value
        );
      return hasRequirements ? true : message;
    },

  match:
    (
      targetField: string,
      getMessage: (field: string) => string
    ): ValidationRule =>
    (value: string, formData?: any) => {
      if (!value || !formData) return true;
      return value === formData[targetField] ? true : getMessage(targetField);
    },

  noSpaces:
    (message = "Spaces are not allowed"): ValidationRule =>
    (value: string) => {
      if (!value) return true;
      return !value.includes(" ") ? true : message;
    },

  alphanumericWithSpecial:
    (
      message = "Only letters, numbers, hyphens, and underscores allowed"
    ): ValidationRule =>
    (value: string) => {
      if (!value) return true;
      return /^[a-zA-Z0-9_-]+$/.test(value) ? true : message;
    },
};
