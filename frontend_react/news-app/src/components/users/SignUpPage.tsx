// src/components/users/SignUpPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from "react-icons/io5";

interface SignUpFormState {
  email: string;
  password: string;
  username: string;
}

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormState>();
  const [step, setStep] = React.useState(1);

  const onSubmit = (data: SignUpFormState, e?: React.BaseSyntheticEvent) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Form Data Submitted:', data);
      // Final submission action
    }
    e?.preventDefault();
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 border rounded-lg max-w-lg w-full">
        <button type="button" onClick={handlePrevious} className="text-gray-500 text-lg p-3 rounded-full">
          <IoChevronBackOutline />
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {step === 1 ? "Enter your email" : step === 2 ? "Create a password" : "Enter a username"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                {...register("email", { required: true })}
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autoFocus
              />
              {errors.email && <p className="text-red-500">Email is required.</p>}
            </div>
          )}
          {step === 2 && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autoFocus
              />
              {errors.password && <p className="text-red-500">Password is required.</p>}
            </div>
          )}
          {step === 3 && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                {...register("username", { required: true })}
                id="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autoFocus
              />
              {errors.username && <p className="text-red-500">Username is required.</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {step < 3 ? "Continue" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

