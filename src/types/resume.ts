export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  website?: string;
  summary: string;
}

export interface CustomSectionItem {
  title: string;
  description: string;
}

export interface CustomSection {
  title: string;
  items: CustomSectionItem[];
}

export interface Resume {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  customSections?: CustomSection[];
  skills: string[];
  projects: Project[];
}