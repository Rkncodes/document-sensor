import { CensorResult, CensoredWord } from "@/lib/types";
import { Detection } from "./types";
import { normalize } from "./normalize";

import { KeywordDetector } from "./detectors/KeywordDetector";
import { EmailDetector } from "./detectors/EmailDetector";
import { PhoneDetector } from "./detectors/PhoneDetector";
import { CreditCardDetector } from "./detectors/CreditCardDetector";

export function runRedaction(text: string): CensorResult {
  const detectors = [
    new EmailDetector(),
    new CreditCardDetector(),
    new PhoneDetector(),
    new KeywordDetector(),
  ];

  let allDetections: Detection[] = [];

  detectors.forEach((detector) => {
    allDetections.push(...detector.detect(text));
  });

  const normalized = normalize(allDetections);

  let censoredText = text;

  // reverse replace to preserve indices
  const reversed = [...normalized].sort((a, b) => b.start - a.start);

  reversed.forEach((detection) => {
    const mask = "*".repeat(detection.end - detection.start);
    censoredText =
      censoredText.slice(0, detection.start) +
      mask +
      censoredText.slice(detection.end);
  });

  // rebuild grouped structure for UI
  const grouped: Record<string, number[]> = {};

  normalized.forEach((detection) => {
    if (!grouped[detection.match]) {
      grouped[detection.match] = [];
    }
    grouped[detection.match].push(detection.start);
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
    fileName: "",
  };
}