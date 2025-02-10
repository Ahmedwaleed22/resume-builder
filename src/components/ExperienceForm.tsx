'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Experience } from '@/types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ExperienceFormProps {
  onSubmit: (data: { experience: Experience[] }) => void;
  onChange?: (data: { experience: Experience[] }) => void;
  defaultValues?: { experience: Experience[] };
  children?: React.ReactNode;
}

export default function ExperienceForm({ onSubmit, onChange, defaultValues, children }: ExperienceFormProps) {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<{ experience: Experience[] }>({
    defaultValues: defaultValues || {
      experience: [{
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience'
  });

  // Remove this line as it's not needed
  // const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      onChange?.(value as { experience: Experience[] });
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  // Remove the second useEffect that was causing the loop
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
            <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
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
              <label htmlFor={`experience.${index}.company`} className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                {...register(`experience.${index}.company` as const, { required: 'Company is required' })}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
              />
              {errors.experience?.[index]?.company && (
                <p className="mt-1 text-sm text-red-600">{errors.experience[index]?.company?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`experience.${index}.position`} className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                {...register(`experience.${index}.position` as const, { required: 'Position is required' })}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
              />
              {errors.experience?.[index]?.position && (
                <p className="mt-1 text-sm text-red-600">{errors.experience[index]?.position?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`experience.${index}.location`} className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                {...register(`experience.${index}.location` as const, { required: 'Location is required' })}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
              />
              {errors.experience?.[index]?.location && (
                <p className="mt-1 text-sm text-red-600">{errors.experience[index]?.location?.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`experience.${index}.startDate`} className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register(`experience.${index}.startDate` as const, { required: 'Start date is required' })}
                  className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                />
                {errors.experience?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience[index]?.startDate?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`experience.${index}.endDate`} className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  {...register(`experience.${index}.endDate` as const, { required: 'End date is required' })}
                  className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                />
                {errors.experience?.[index]?.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience[index]?.endDate?.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`experience.${index}.description`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register(`experience.${index}.description`)}
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
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
          })}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
          Add Experience
        </button>
      </div>
      {children}
    </form>
  );
}