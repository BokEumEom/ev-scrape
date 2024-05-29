// src/components/users/InputField.tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  register: any;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, register, error, autoComplete, autoFocus, id }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...register}
      id={id}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      aria-invalid={!!error}
      aria-describedby={id ? `${id}-error` : undefined}
    />
    {error && <p id={id ? `${id}-error` : undefined} className="text-red-500">{error}</p>}
  </div>
);

export default InputField;
