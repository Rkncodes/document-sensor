'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import { CensorResult } from '@/lib/types';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [result, setResult] = useState<CensorResult | null>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const parsedData: CensorResult = JSON.parse(dataParam);
        setResult(parsedData);
      } catch (error) {
        console.error('Failed to parse result data:', error);
      }
    }
  }, [searchParams]);

  const highlightText = (text: string, words: string[], isCensored: boolean) => {
    if (words.length === 0) return text;

    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isHighlighted = words.some(
        word => part.toLowerCase() === word.toLowerCase()
      );
      if (isHighlighted) {
        return (
          <mark
            key={index}
            className={
              isCensored
                ? 'bg-slate-800 text-slate-800 rounded px-1'
                : 'bg-yellow-200 text-slate-900 rounded px-1'
            }
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result.censoredText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `censored_${result.fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!result) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-slate-600">Loading results...</p>
        </div>
      </Layout>
    );
  }

  const censoredWordsList = result.censoredWords.map(cw => cw.word);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Results</h2>
              <p className="text-sm text-slate-600 mt-1">
                File: {result.fileName}
              </p>
              <p className="text-sm text-slate-600">
                Censored {result.censoredWords.length} sensitive word
                {result.censoredWords.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
              >
                Upload Another
              </button>
              
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </div>

          {result.censoredWords.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                Censored Words:
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.censoredWords.map((cw, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full"
                  >
                    {cw.word} ({cw.positions.length})
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Original Text
              </h3>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 max-h-[600px] overflow-y-auto">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {highlightText(
                    result.originalText,
                    censoredWordsList,
                    false
                  )}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-slate-800 rounded-full mr-2"></span>
                Censored Text
              </h3>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 max-h-[600px] overflow-y-auto">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {highlightText(
                    result.censoredText,
                    censoredWordsList,
                    true
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="text-center">
          <p className="text-slate-600">Loading results...</p>
        </div>
      </Layout>
    }>
      <ResultContent />
    </Suspense>
  );
}
