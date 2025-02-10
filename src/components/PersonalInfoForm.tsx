'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PersonalInfo } from '@/types/resume';
import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
// Remove this import
// import { useCompletion } from 'ai/react';

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfo) => void;
  onChange?: (data: Partial<PersonalInfo>) => void;
  defaultValues?: PersonalInfo;
  children?: React.ReactNode;
}

export default function PersonalInfoForm({ onSubmit, onChange, defaultValues, children }: PersonalInfoFormProps) {
  // Remove AI-related hook
  // const { complete, completion, isLoading } = useCompletion({
  //   api: '/api/ai-generate',
  // });

  const [isGenerating, setIsGenerating] = useState(false);
  // First, update the defaultValues in useForm
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PersonalInfo>({
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      jobTitle: '', // Add this line
      summary: ''
    }
  });

  // Watch all fields for changes
  const values = watch();

  // Update preview whenever any field changes
  useEffect(() => {
    const subscription = watch((value) => {
      onChange?.(value as PersonalInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  // Remove or modify the generate handler
  // Add state for error message
  const [generateError, setGenerateError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const currentValues = watch();
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData: {
            personalInfo: {
              ...currentValues,
              jobTitle: currentValues.jobTitle // Explicitly include job title
            }
          }
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      if (data.text) {
        setValue('summary', data.text);
      }
    } catch (error) {
      setGenerateError(error instanceof Error ? error.message : 'Failed to generate summary');
    } finally {
      setIsGenerating(false);
    }
  };

  // Update the summary section JSX to show loading and error states
  // Remove this effect
  // useEffect(() => {
  //   if (completion) {
  //     setValue('summary', completion);
  //   }
  // }, [completion, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Details Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Professional Info Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              {...register('jobTitle', { required: 'Job title is required' })}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              {...register('website')}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Professional Summary
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="float-right inline-flex items-center p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none"
            title="Generate with AI"
          >
            <SparklesIcon className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
        </label>
        <div className="relative">
          <textarea
            {...register('summary', { required: 'Summary is required' })}
            rows={6}
            className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
            disabled={isGenerating}
          />
          <span className="absolute bottom-2 right-2 text-sm text-gray-400">
            {watch('summary')?.length || 0}
          </span>
        </div>
        {generateError && (
          <p className="mt-1 text-sm text-red-600">{generateError}</p>
        )}
        {errors.summary && (
          <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
        )}
      </div>
      {children}
    </form>
  );
}