'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CustomSection } from '@/types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CustomSectionFormProps {
  onSubmit: (data: { customSections: CustomSection[] }) => void;
  onChange?: (data: { customSections: CustomSection[] }) => void;
  defaultValues?: { customSections: CustomSection[] };
  children?: React.ReactNode;
}

export default function CustomSectionForm({ onSubmit, onChange, defaultValues, children }: CustomSectionFormProps) {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<{ customSections: CustomSection[] }>({ 
    defaultValues: defaultValues || {
      customSections: [{
        title: '',
        items: [{
          title: '',
          description: ''
        }]
      }]
    }
  });

  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: 'customSections'
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onChange?.(value as { customSections: CustomSection[] });
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {sectionFields.map((sectionField, sectionIndex) => (
        <div key={sectionField.id} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-4">
              <label htmlFor={`customSections.${sectionIndex}.title`} className="block text-sm font-medium text-gray-700">
                Section Title
              </label>
              <input
                type="text"
                {...register(`customSections.${sectionIndex}.title` as const, { required: 'Section title is required' })}
                className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                placeholder="e.g., Skills, Projects, Certifications"
              />
              {errors.customSections?.[sectionIndex]?.title && (
                <p className="mt-1 text-sm text-red-600">{errors.customSections[sectionIndex]?.title?.message}</p>
              )}
            </div>
            {sectionIndex > 0 && (
              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                className="text-red-600 hover:text-red-800 mt-6"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            {sectionField.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="space-y-4 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label
                        htmlFor={`customSections.${sectionIndex}.items.${itemIndex}.title`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        {...register(`customSections.${sectionIndex}.items.${itemIndex}.title` as const, {
                          required: 'Title is required'
                        })}
                        className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`customSections.${sectionIndex}.items.${itemIndex}.description`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        {...register(`customSections.${sectionIndex}.items.${itemIndex}.description` as const)}
                        rows={3}
                        className="mt-1 block w-full rounded-sm border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                  </div>
                  {itemIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...sectionField.items];
                        newItems.splice(itemIndex, 1);
                        const newSections = [...sectionFields];
                        newSections[sectionIndex] = { ...sectionField, items: newItems };
                        removeSection(sectionIndex);
                        appendSection(newSections[sectionIndex]);
                      }}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newItems = [...sectionField.items, { title: '', description: '' }];
                const newSections = [...sectionFields];
                newSections[sectionIndex] = { ...sectionField, items: newItems };
                removeSection(sectionIndex);
                appendSection(newSections[sectionIndex]);
              }}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-1 h-4 w-4 text-gray-400" />
              Add Item
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => appendSection({
            title: '',
            items: [{ title: '', description: '' }]
          })}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
          Add Section
        </button>
      </div>
      {children}
    </form>
  );
}