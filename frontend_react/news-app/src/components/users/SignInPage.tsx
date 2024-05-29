// src/components/users/SignInPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signInUser, getGitHubLoginUrl } from '@/services/userService';
import InputField from './InputField';
import Button from './Button';
import OAuthButton from './OAuthButton';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      navigate('/mypage');
    },
    onError: (error: any) => {
      setSignInError(error.message || 'Failed to sign in. Please try again.');
    }
  });

  const [signInError, setSignInError] = React.useState<string | null>(null);

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate({ email: data.email, password: data.password });
  };

  const handleGitHubLogin = () => {
    window.location.href = getGitHubLoginUrl();
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="bg-white p-6 sm:p-8 lg:p-10 max-w-md w-full space-y-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Sign in form">
          <InputField
            label="Email address"
            type="email"
            id="email"
            placeholder="Email"
            register={register("email", { 
              required: "Email is required", 
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
            })}
            error={errors.email?.message}
            autoComplete="email"
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            register={register("password", { required: "Password is required" })}
            error={errors.password?.message}
            autoComplete="current-password"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          {signInError && <div className="text-red-500 text-xs">{signInError}</div>}
          <Button isLoading={mutation.isLoading} text="Sign In" />
          <div className="flex space-x-3">
            <OAuthButton onClick={handleGitHubLogin} text="Sign In with GitHub" />
            <OAuthButton onClick={handleSignUp} text="Sign Up Now" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
