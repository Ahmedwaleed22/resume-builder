'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Education } from '@/types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EducationFormProps {
  onSubmit: (data: { education: Education[] }) => void;
  onChange?: (data: { education: Education[] }) => void;
  defaultValues?: { education: Education[] };
  children?: React.ReactNode;
}

export default function EducationForm({ onSubmit, onChange, defaultValues, children }: EducationFormProps) {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<{ education: Education[] }>({
    defaultValues: defaultValues || {
      education: [{
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  });

  // Remove this line
  // const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      onChange?.(value as { education: Education[] });
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  // Remove the second useEffect
  // useEffect(() => {
  //   if (onChange) {
  //     onChange(watchAllFields);
  //   }
  // }, [watchAllFields, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Education {index + 1}</h3>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={`education.${index}.institution`} className="block text-sm font-medium text-gray-700">
                School
              </label>
              <input
                type="text"
                {...register(`education.${index}.institution` as const, { required: 'School is required' })}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
              />
              {errors.education?.[index]?.institution && (
                <p className="mt-1 text-sm text-red-600">{errors.education[index]?.institution?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`education.${index}.degree`} className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                {...register(`education.${index}.degree` as const, { required: 'Degree is required' })}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
              />
              {errors.education?.[index]?.degree && (
                <p className="mt-1 text-sm text-red-600">{errors.education[index]?.degree?.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`education.${index}.startDate`} className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register(`education.${index}.startDate` as const, { required: 'Start date is required' })}
                  className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                />
                {errors.education?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.startDate?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`education.${index}.endDate`} className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  {...register(`education.${index}.endDate` as const, { required: 'End date is required' })}
                  className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                />
                {errors.education?.[index]?.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.endDate?.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`education.${index}.description`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register(`education.${index}.description`)}
                rows={3}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => append({
            institution: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: ''
          })}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
          Add Education
        </button>
      </div>
      {children}
    </form>
  );
}