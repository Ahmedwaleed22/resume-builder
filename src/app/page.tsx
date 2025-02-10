'use client';

import { useState } from 'react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import EducationForm from '@/components/EducationForm';
import ExperienceForm from '@/components/ExperienceForm';
import CustomSectionForm from '@/components/CustomSectionForm';
import { Resume, PersonalInfo, Education, Experience, CustomSection } from '@/types/resume';
import ResumePreview from '@/components/ResumePreview';
import { ArrowRightIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<Partial<Resume>>({
    personalInfo: undefined,
    education: undefined,
    experience: undefined,
    customSections: undefined,
    skills: [],
    projects: []
  });

  const handlePersonalInfoSubmit = (data: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: data }));
    setStep(2);
  };

  const handleEducationSubmit = (data: { education: Education[] }) => {
    setResumeData(prev => ({ ...prev, education: data.education }));
    setStep(3);
  };

  const handleExperienceSubmit = (data: { experience: Experience[] }) => {
    setResumeData(prev => ({ ...prev, experience: data.experience }));
    setStep(4);
  };

  const handleCustomSectionsSubmit = (data: { customSections: CustomSection[] }) => {
    setResumeData(prev => ({ ...prev, customSections: data.customSections }));
    // Move to next step or generate resume
    console.log('Resume Data:', resumeData);
  };

  const handlePersonalInfoChange = (data: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: prev.personalInfo 
        ? { ...prev.personalInfo, ...data }
        : data as PersonalInfo
    }));
  };

  const handleEducationChange = (data: { education: Education[] }) => {
    setResumeData(prev => ({
      ...prev,
      education: data.education
    }));
  };

  const handleExperienceChange = (data: { experience: Experience[] }) => {
    setResumeData(prev => ({
      ...prev,
      experience: data.experience
    }));
  };

  const handleCustomSectionsChange = (data: { customSections: CustomSection[] }) => {
    setResumeData(prev => ({
      ...prev,
      customSections: data.customSections
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 flex">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-sm text-gray-600">
              Create your professional resume in minutes
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative flex items-center justify-between w-full max-w-2xl">
              {/* Progress Bar Background */}
              <div className="absolute h-1 bg-gray-200 w-[85%] mx-auto right-0 left-0 top-1/3 -translate-y-1/2"></div>
              {/* Active Progress Bar */}
              <div
                className="absolute h-1 bg-indigo-600 transition-all duration-300 top-1/3 right-0 left-0 -translate-y-1/2"
                style={{ width: `${((step - 1) / 2) * 60}%`, marginLeft: '5%' }}
              ></div>
              {/* Step Indicators */}
              <div className="relative z-10 flex justify-between w-full">
                {[
                  { step: 1, label: 'Personal Info' },
                  { step: 2, label: 'Education' },
                  { step: 3, label: 'Experience' },
                  { step: 4, label: 'Custom Sections' }
                ].map(({ step: stepNumber, label }) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <button
                      onClick={() => setStep(stepNumber)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step === stepNumber
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : stepNumber < step
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border-2 border-gray-300'
                      }`}
                    >
                      {stepNumber < step ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{stepNumber}</span>
                      )}
                    </button>
                    <span className="mt-2 text-sm font-medium text-gray-600">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            {step === 1 && (
              <div className="space-y-6">
                <PersonalInfoForm
                  onSubmit={handlePersonalInfoSubmit}
                  onChange={handlePersonalInfoChange}
                  defaultValues={resumeData.personalInfo}
                >
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                      <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                    </button>
                  </div>
                </PersonalInfoForm>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <EducationForm
                  onSubmit={handleEducationSubmit}
                  onChange={handleEducationChange}
                  defaultValues={resumeData.education ? { education: resumeData.education } : undefined}
                >
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                      <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                    </button>
                  </div>
                </EducationForm>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <ExperienceForm
                  onSubmit={handleExperienceSubmit}
                  onChange={handleExperienceChange}
                  defaultValues={resumeData.experience ? { experience: resumeData.experience } : undefined}
                >
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                      <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                    </button>
                  </div>
                </ExperienceForm>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-6">
                <CustomSectionForm
                  onSubmit={handleCustomSectionsSubmit}
                  onChange={handleCustomSectionsChange}
                  defaultValues={resumeData.customSections ? { customSections: resumeData.customSections } : undefined}
                >
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/generate-pdf', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(resumeData),
                          });

                          if (!response.ok) {
                            throw new Error('Failed to generate PDF');
                          }

                          // Create a blob from the PDF stream
                          const blob = await response.blob();
                          // Create an object URL for the blob
                          const url = window.URL.createObjectURL(blob);
                          // Create a link element
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'resume.pdf';
                          // Append to the document and click
                          document.body.appendChild(link);
                          link.click();
                          // Clean up
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);
                        } catch (error) {
                          console.error('Error generating PDF:', error);
                          alert('Failed to generate PDF. Please try again.');
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Export Resume
                      <DocumentArrowDownIcon className="ml-2 -mr-1 h-4 w-4" />
                    </button>
                  </div>
                </CustomSectionForm>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 px-4">
        <div className="sticky top-12">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </main>
  );
}
