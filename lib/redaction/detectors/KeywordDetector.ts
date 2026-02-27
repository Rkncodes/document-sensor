import { Detector } from "./Detector";
import { Detection } from "../types";

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

export class KeywordDetector implements Detector {
  name = "KeywordDetector";

  detect(text: string): Detection[] {
    const detections: Detection[] = [];

    SENSITIVE_WORDS.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");

      let match;
      while ((match = regex.exec(text)) !== null) {
        detections.push({
          type: "KEYWORD",
          category: "SENSITIVE",
          match: match[0],
          start: match.index!,
          end: match.index! + match[0].length,
          priority: 1,
        });
      }
    });

    return detections;
  }
}

