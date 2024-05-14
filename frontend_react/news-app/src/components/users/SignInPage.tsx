// src/components/users/SignInPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const onSubmit = (data: SignInFormData) => {
      console.log('Form Data Submitted:', data);
      // Add logic here for authentication
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 lg:p-8 max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Email or phone number"
                className="w-full border px-3 py-3 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                autoComplete="email"
              />
              {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full border px-3 py-3 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                autoComplete="current-password"
              />
              {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              New to EV Trends?{' '}
              <NavLink to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up now
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    );
  };

export default SignInPage;
