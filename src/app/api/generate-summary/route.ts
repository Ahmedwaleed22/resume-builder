import { NextResponse } from 'next/server';
import { PersonalInfo } from '@/types/resume';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { resumeData } = await request.json();
    const personalInfo = resumeData.personalInfo;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writer. Create concise and impactful professional summaries.'
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
    return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}