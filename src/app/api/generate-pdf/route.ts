import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumePDF } from '@/components/ResumePDF';
import { Resume } from '@/types/resume';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // Validate input data
    const resumeData: Resume = await request.json();
    if (!resumeData || !resumeData.personalInfo) {
      return NextResponse.json({ error: 'Invalid resume data provided' }, { status: 400 });
    }
    
    // Generate PDF buffer with error handling
    let pdfBuffer;
    try {
      pdfBuffer = await renderToBuffer(ResumePDF({ resumeData }));
    } catch (renderError) {
      console.error('PDF rendering error:', renderError);
      return NextResponse.json({ error: 'Failed to render PDF document' }, { status: 500 });
    }
    
    // Validate PDF buffer
    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('Empty PDF buffer generated');
      return NextResponse.json({ error: 'Generated PDF is empty' }, { status: 500 });
    }
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"'
      }
    });
    
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the PDF' },
      { status: 500 }
    );
  }
}