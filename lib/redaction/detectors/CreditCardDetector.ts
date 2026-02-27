import { Detector } from "./Detector";
import { Detection } from "../types";

const CARD_REGEX = /\b\d{13,16}\b/g;

function luhnCheck(card: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  for (let i = card.length - 1; i >= 0; i--) {
    let digit = parseInt(card[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export class CreditCardDetector implements Detector {
  name = "CreditCardDetector";

  detect(text: string): Detection[] {
    const detections: Detection[] = [];

    let match;
    while ((match = CARD_REGEX.exec(text)) !== null) {
      const value = match[0];

      if (luhnCheck(value)) {
        detections.push({
          type: "CREDIT_CARD",
          category: "PII",
          match: value,
          start: match.index!,
          end: match.index! + value.length,
          priority: 10,
        });
      }
    }

    return detections;
  }
}