import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/types/resume';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT0kLW-43aMEzIO6XUTLjad8.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT0kLW-43aMEzIO6XUTLjad8.ttf', fontWeight: 'bold' }
  ]
});

interface ResumePDFProps {
  resumeData: Resume;
}

const styles = StyleSheet.create({
  page: {
    padding: 32, // Increased padding
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 28,
  },
  header: {
    marginBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 20,
  },
  name: {
    fontSize: 32, // Increased size
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  jobTitle: {
    fontSize: 24, // Increased size
    color: '#4B5563',
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 12,
  },
  contactItem: {
    fontSize: 14, // Increased font size
    color: '#4B5563',
  },
  contactLabel: {
    fontWeight: 'medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    color: '#111827', // Matches text-gray-900
  },
  experienceItem: {
    marginBottom: 16,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937', // Matches text-gray-800
  },
  dates: {
    fontSize: 12,
    color: '#6B7280', // Matches text-gray-600
  },
  position: {
    fontSize: 13,
    fontWeight: 'medium',
    color: '#4B5563', // Matches text-gray-700
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: '#4B5563', // Matches text-gray-700
    lineHeight: 1.5,
  },
});

export function ResumePDF({ resumeData }: ResumePDFProps) {
  if (!resumeData || !resumeData.personalInfo) {
    throw new Error('Invalid resume data provided');
  }

  const { personalInfo, education, experience, skills, projects, customSections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          {personalInfo.jobTitle && (
            <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
          )}
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email:</Text>
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone:</Text>
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location:</Text>
                <Text>{personalInfo.location}</Text>
              </View>
            )}
            {personalInfo.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Website:</Text>
                <Text>{personalInfo.website}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Summary Section */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.dates}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.position}>{exp.position}</Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>{edu.institution}</Text>
                  <Text style={styles.dates}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.position}>{edu.degree}</Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.description}>{skills.join(', ')}</Text>
          </View>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>{project.name}</Text>
                {project.description && (
                  <Text style={styles.description}>{project.description}</Text>
                )}
                {project.technologies && (
                  <Text style={styles.description}>
                    Technologies: {project.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections &&
          customSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.experienceItem}>
                  <Text style={styles.companyName}>{item.title}</Text>
                  {item.description && (
                    <Text style={styles.description}>{item.description}</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
      </Page>
    </Document>
  );
}