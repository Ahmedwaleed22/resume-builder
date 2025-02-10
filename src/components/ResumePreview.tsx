import { Resume } from '@/types/resume';

interface ResumePreviewProps {
  resumeData: Partial<Resume>;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, education, experience } = resumeData;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-[21cm] mx-auto">
      {/* Personal Info Section */}
      {personalInfo && (
        <div className="mb-8">
          <div className="text-left border-b pb-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <h2 className="text-2xl text-gray-800 mb-4">
                {personalInfo.jobTitle}
              </h2>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-base">
              {personalInfo.email && (
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {personalInfo.email}
                </p>
              )}
              {personalInfo.phone && (
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {personalInfo.phone}
                </p>
              )}
              {personalInfo.location && (
                <p className="text-gray-700">
                  <span className="font-medium">Location:</span> {personalInfo.location}
                </p>
              )}
              {personalInfo.website && (
                <p className="text-gray-700">
                  <span className="font-medium">Website:</span> {personalInfo.website}
                </p>
              )}
            </div>
          </div>
          {personalInfo.summary && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">{personalInfo.summary}</p>
            </div>
          )}
        </div>
      )}

      {/* Experience Section - Update the styling */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-gray-800">{exp.company}</h3>
                <span className="text-base text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-base font-semibold text-gray-700 mb-2">{exp.position}</p>
              {exp.description && (
                <p className="text-base text-gray-700 leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rest of the sections remain the same */}
      {/* Education Section */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{edu.institution}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-gray-700">{edu.degree}</p>
              {edu.description && (
                <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{exp.company}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-700">{exp.position}</p>
              {exp.description && (
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 mt-1 inline-block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.customSections && resumeData.customSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">
            {section.title}
          </h2>
          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="mb-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}