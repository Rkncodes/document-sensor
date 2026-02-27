import { CensorResult, CensoredWord } from './types';

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

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type Match = {
  word: string;
  start: number;
  end: number;
};

function detectKeywordMatches(text: string): Match[] {
  const matches: Match[] = [];

  SENSITIVE_WORDS.forEach((word) => {
    const safeWord = escapeRegex(word);
    const regex = new RegExp(`\\b${safeWord}\\b`, 'gi');

    for (const match of text.matchAll(regex)) {
      const start = match.index!;
      const end = start + match[0].length;

      matches.push({
        word,
        start,
        end,
      });
    }
  });

  return matches;
}

function mergeOverlappingMatches(matches: Match[]): Match[] {
  if (matches.length === 0) return [];

  const sorted = matches.sort((a, b) => a.start - b.start);
  const merged: Match[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const current = sorted[i];

    if (current.start <= prev.end) {
      prev.end = Math.max(prev.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

function applyMasking(text: string, matches: Match[]): string {
  let result = '';
  let lastIndex = 0;

  for (const match of matches) {
    result += text.slice(lastIndex, match.start);
    result += '*'.repeat(match.end - match.start);
    lastIndex = match.end;
  }

  result += text.slice(lastIndex);
  return result;
}

export function censorText(text: string): CensorResult {
  const keywordMatches = detectKeywordMatches(text);
  const mergedMatches = mergeOverlappingMatches(keywordMatches);
  const censoredText = applyMasking(text, mergedMatches);

  const grouped: Record<string, number[]> = {};

  keywordMatches.forEach((match) => {
    if (!grouped[match.word]) {
      grouped[match.word] = [];
    }
    grouped[match.word].push(match.start);
  });

  const censoredWords: CensoredWord[] = Object.entries(grouped).map(
    ([word, positions]) => ({
      word,
      positions,
    })
  );

  return {
    originalText: text,
    censoredText,
    censoredWords,
    fileName: '',
  };
}