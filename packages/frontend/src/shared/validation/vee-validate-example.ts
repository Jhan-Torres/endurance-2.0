// Alternative: Using VeeValidate (if you want to add it as dependency)

/*
First install: npm install vee-validate yup

Then create schemas with Yup:
*/

import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Must be at least 8 characters').required('Password is required'),
});

export const signupSchema = yup.object({
  name: yup.string().min(2, 'Must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/, 'Password must contain uppercase, lowercase, number, and special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm password'),
});

/*
And use in components like this:

<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <Field name="email" v-slot="{ field, errors }">
      <input v-bind="field" type="email" />
      <span class="error">{{ errors[0] }}</span>
    </Field>
    
    <Field name="password" v-slot="{ field, errors }">
      <input v-bind="field" type="password" />
      <span class="error">{{ errors[0] }}</span>
    </Field>
    
    <button type="submit">Submit</button>
  </Form>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import { loginSchema } from '../validation/schemas';

const schema = loginSchema;

const onSubmit = (values) => {
  console.log(values); // { email: '...', password: '...' }
};
</script>
*/
