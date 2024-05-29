// src/components/users/SignUpPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '@/services/userService';
import Button from './Button';
import FormSteps from './FormSteps';

interface SignUpFormState {
  email: string;
  password: string;
  username: string;
}

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpFormState>();
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      reset();
      navigate('/signin');
    },
    onError: (error: any) => {
      setError(error.message || 'An unexpected error occurred');
    }
  });

  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = (data: SignUpFormState) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      mutation.mutate({ email: data.email, password: data.password, username: data.username });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setError(null);
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="bg-white p-8 max-w-lg w-full rounded-lg shadow-md">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="text-gray-500 text-lg p-3 rounded-full"
            aria-label="Go back to the previous step"
          >
            <IoChevronBackOutline />
          </button>
        )}
        <h1 className="text-2xl font-bold mb-6">
          {step === 1 ? "Enter your email" : step === 2 ? "Create a password" : "Enter a username"}
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSteps step={step} register={register} errors={errors} />
          <Button isLoading={mutation.isLoading} text={step < 3 ? "Continue" : "Sign Up"} />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
