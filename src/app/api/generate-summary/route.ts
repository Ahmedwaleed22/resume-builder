import { NextResponse } from 'next/server';
import { PersonalInfo } from '@/types/resume';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "http://localhost:11434/v1"
});

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { resumeData } = await request.json();
    const personalInfo = resumeData.personalInfo;

    const response = await openai.chat.completions.create({
      model: 'llama3.2:latest',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writer. Create concise and impactful professional summaries, Don\'t write anything like "Here is a professional summary" just start writing the summary itself without anything else'
        },
        // In the messages array
          {
            role: 'user',
            content: `Create a professional summary for a person with the following details:
              Name: ${personalInfo.firstName} ${personalInfo.lastName}
              Job Title: ${personalInfo.jobTitle}
              Location: ${personalInfo.location}
              Email: ${personalInfo.email}
              Phone: ${personalInfo.phone}
              Website: ${personalInfo.website || 'Not provided'}
              
              Make it professional, concise, and highlight their potential as a candidate.
              The summary should be 2-3 sentences long and emphasize their role as a ${personalInfo.jobTitle}.`
          }
      ]
    });

    const generatedText = response.choices[0].message.content;
    return NextResponse.json({ text: generatedText });
    
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}