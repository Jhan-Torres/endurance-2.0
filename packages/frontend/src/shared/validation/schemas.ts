import {
  validationRules,
  ValidationSchema,
} from "../composables/useFormValidation";

// Auth Form Schema
export const authFormSchema: ValidationSchema = {
  name: {
    required: true,
    rules: [
      validationRules.minLength(2, "Must be at least 2 characters"),
      validationRules.maxLength(50, "Cannot exceed 50 characters"),
      (value: string) => {
        if (!value) return true;
        const invalidChars = /[<>:"\/\\|?*\x00-\x1f\d]/;
        return !invalidChars.test(value)
          ? true
          : "Numbers and special characters not allowed";
      },
    ],
  },
  email: {
    required: true,
    rules: [
      validationRules.email(),
      validationRules.maxLength(254, "Email is too long"),
    ],
  },
  password: {
    required: true,
    rules: [
      validationRules.minLength(8, "Must be at least 8 characters"),
      validationRules.maxLength(128, "Cannot exceed 128 characters"),
      validationRules.passwordStrength(),
    ],
  },
  confirmPassword: {
    required: true,
    rules: [
      (value: string, formData?: any) => {
        if (!value || !formData) return "Please confirm your password";
        return value === formData.password ? true : "Passwords do not match";
      },
    ],
  },
};

// Login Modal Schema
export const loginModalSchema: ValidationSchema = {
  url: {
    required: true,
    rules: [
      (value: string) => {
        if (!value) return "Website URL is required";
        try {
          const url = new URL(value.trim());
          if (!["http:", "https:"].includes(url.protocol)) {
            return "URL must start with http:// or https://";
          }
          if (!url.hostname || url.hostname.length < 3) {
            return "Please enter a valid website URL";
          }
          return true;
        } catch {
          return "Please enter a valid URL (e.g., https://example.com)";
        }
      },
      validationRules.maxLength(
        2048,
        "URL is too long (maximum 2048 characters)"
      ),
    ],
  },
  username: {
    required: true,
    rules: [
      validationRules.minLength(1, "Username cannot be empty"),
      validationRules.maxLength(
        100,
        "Username is too long (maximum 100 characters)"
      ),
      (value: string) => {
        if (!value) return true;
        if (value.includes("@")) {
          return validationRules.email("Please enter a valid email address")(
            value
          );
        }
        return true;
      },
    ],
  },
  password: {
    required: true,
    rules: [
      validationRules.minLength(1, "Password cannot be empty"),
      validationRules.maxLength(
        512,
        "Password is too long (maximum 512 characters)"
      ),
    ],
  },
  notes: {
    required: false,
    rules: [
      validationRules.maxLength(
        1000,
        "Notes are too long (maximum 1000 characters)"
      ),
    ],
  },
};

// Note Modal Schema
export const noteModalSchema: ValidationSchema = {
  title: {
    required: true,
    rules: [
      validationRules.minLength(1, "Title cannot be empty"),
      validationRules.maxLength(
        100,
        "Title is too long (maximum 100 characters)"
      ),
      (value: string) => {
        if (!value) return true;
        const invalidChars = /[<>:"\/\\|?*\x00-\x1f]/;
        return !invalidChars.test(value)
          ? true
          : "Title contains invalid characters";
      },
    ],
  },
  content: {
    required: true,
    rules: [
      validationRules.minLength(1, "Content cannot be empty"),
      validationRules.maxLength(
        10000,
        "Content is too long (maximum 10,000 characters)"
      ),
    ],
  },
};

// Profile Modal Schema
export const profileModalSchema: ValidationSchema = {
  name: {
    required: true,
    rules: [
      validationRules.minLength(2, "Must be at least 2 characters"),
      validationRules.maxLength(50, "Cannot exceed 50 characters"),
      (value: string) => {
        if (!value) return true;
        const invalidChars = /[<>:"\/\\|?*\x00-\x1f\d]/;
        return !invalidChars.test(value)
          ? true
          : "Numbers and special characters not allowed";
      },
    ],
  },
  email: {
    required: true,
    rules: [
      validationRules.email(),
      validationRules.maxLength(254, "Email is too long"),
    ],
  },
};
