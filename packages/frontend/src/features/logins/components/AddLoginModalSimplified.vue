// Example of simplified AddLoginModal using the new validation system

<template>
  <!-- Modal content -->
  <div v-if="isOpen" class="modal">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <h2>Add New Login</h2>
      
      <!-- Website URL -->
      <FormInput
        id="url"
        v-model="form.formData.url"
        type="url"
        label="Website URL"
        placeholder="https://example.com"
        :required="true"
        :error="form.errors.url"
        :touched="form.touched.url"
        @blur="form.validateField('url', form.formData.url)"
      />

      <!-- Username/Email -->
      <FormInput
        id="username"
        v-model="form.formData.username"
        label="Username / Email"
        placeholder="Username or email"
        :required="true"
        :error="form.errors.username"
        :touched="form.touched.username"
        @blur="form.validateField('username', form.formData.username)"
      />

      <!-- Password -->
      <FormInput
        id="password"
        v-model="form.formData.password"
        type="password"
        label="Password"
        placeholder="Password"
        :required="true"
        :error="form.errors.password"
        :touched="form.touched.password"
        @blur="form.validateField('password', form.formData.password)"
      />

      <!-- Notes (Optional) -->
      <div>
        <label class="block text-sm font-medium mb-1">Notes</label>
        <textarea
          v-model="form.formData.notes"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="Optional notes..."
          @blur="form.validateField('notes', form.formData.notes)"
        />
        <p v-if="form.errors.notes && form.touched.notes" class="text-red-500 text-sm mt-1">
          {{ form.errors.notes }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button 
          type="submit" 
          :disabled="!form.isValid || loading"
          class="btn btn-primary"
        >
          {{ loading ? 'Adding...' : 'Add Login' }}
        </button>
        <button type="button" @click="closeModal" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFormValidation } from '../../../shared/composables/useFormValidation';
import { loginModalSchema } from '../../../shared/validation/schemas';
import FormInput from '../../../shared/components/FormInput.vue';

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  save: [login: any];
}>();

const form = useFormValidation(loginModalSchema);
const loading = ref(false);

const handleSubmit = async () => {
  if (!form.validateAll()) return;
  
  loading.value = true;
  try {
    // Save logic here
    emit('save', form.formData);
    form.reset();
    emit('close');
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  form.reset();
  emit('close');
};
</script>
