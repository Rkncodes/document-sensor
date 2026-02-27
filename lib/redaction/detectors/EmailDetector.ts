import { Detector } from "./Detector";
import { Detection } from "../types";

const EMAIL_REGEX =
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

export class EmailDetector implements Detector {
  name = "EmailDetector";

  detect(text: string): Detection[] {
    const detections: Detection[] = [];

    let match;
    while ((match = EMAIL_REGEX.exec(text)) !== null) {
      detections.push({
        type: "EMAIL",
        category: "PII",
        match: match[0],
        start: match.index!,
        end: match.index! + match[0].length,
        priority: 10,
      });
    }

    return detections;
  }
}