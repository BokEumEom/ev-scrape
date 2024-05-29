// src/components/users/FormSteps.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import InputField from './InputField';

interface FormStepsProps {
  step: number;
  register: UseFormRegister<SignUpFormState>;
  errors: any;
}

interface SignUpFormState {
  email: string;
  password: string;
  username: string;
}

const FormSteps: React.FC<FormStepsProps> = ({ step, register, errors }) => {
  switch (step) {
    case 1:
      return (
        <InputField
          label="Email Address"
          type="email"
          id="email"
          register={register("email", { 
            required: "Email is required", 
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
          })}
          error={errors.email?.message}
          autoFocus
        />
      );
    case 2:
      return (
        <InputField
          label="Password"
          type="password"
          id="password"
          register={register("password", { 
            required: "Password is required", 
            minLength: { value: 6, message: "Password must be at least 6 characters long" } 
          })}
          error={errors.password?.message}
          autoFocus
        />
      );
    case 3:
      return (
        <InputField
          label="Username"
          type="text"
          id="username"
          register={register("username", { required: "Username is required" })}
          error={errors.username?.message}
          autoFocus
        />
      );
    default:
      return null;
  }
};

export default FormSteps;
