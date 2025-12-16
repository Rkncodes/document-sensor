import { NextRequest, NextResponse } from 'next/server';
import { CensorResult, CensoredWord } from '@/lib/types';

const SENSITIVE_WORDS = [
  'confidential',
  'secret',
  'password',
  'ssn',
  'credit card',
  'private',
  'classified',
  'restricted',
  'internal',
  'proprietary',

  // abuse / violence
  'abuse',
  'abusive',
  'kill',
  'killing',
  'murder',
  'murdered',
  'violence',
  'violent',
  'assault',
  'threat',
];


async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  if (file.type === 'text/plain') {
    const text = new TextDecoder().decode(buffer);
    return text;
  }

  if (file.type === 'application/pdf') {
    try {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(Buffer.from(buffer));
      return data.text;
    } catch (error) {
      throw new Error('Failed to parse PDF file');
    }
  }

  if (
    file.type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    try {
      const mammoth = require('mammoth');
      const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
      return result.value;
    } catch (error) {
      throw new Error('Failed to parse DOCX file');
    }
  }

  throw new Error('Unsupported file type');
}

function censorText(text: string): CensorResult {
  let censoredText = text;
  const censoredWords: CensoredWord[] = [];

  SENSITIVE_WORDS.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = [...text.matchAll(regex)];

    if (matches.length > 0) {
      const positions = matches.map(match => match.index!);
      censoredWords.push({
        word,
        positions,
      });

      const replacement = '*'.repeat(word.length);
      censoredText = censoredText.replace(regex, replacement);
    }
  });

  return {
    originalText: text,
    censoredText,
    censoredWords,
    fileName: '',
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await extractTextFromFile(file);

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'No text could be extracted from the file' },
        { status: 400 }
      );
    }

    const result = censorText(text);
    result.fileName = file.name;

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process file',
      },
      { status: 500 }
    );
  }
}
