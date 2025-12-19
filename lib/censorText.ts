export interface CensorResult {
  censoredText: string;
  censoredCount: number;
}

const escapeRegExp = (input: string): string =>
  input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function censorText(text: string, sensitiveWords: string[]): CensorResult {
  if (!text) {
    return { censoredText: "", censoredCount: 0 };
  }

  const words = sensitiveWords.filter(Boolean);
  let total = 0;
  let output = text;

  for (const word of words) {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");
    output = output.replace(pattern, (match) => {
      total += 1;
      return "*".repeat(match.length);
    });
  }

  return { censoredText: output, censoredCount: total };
}







