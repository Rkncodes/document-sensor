import { Detector } from "./Detector";
import { Detection } from "../types";

const PHONE_REGEX =
  /\b(?:\+?\d{1,3}[\s-]?)?\d{10}\b/g;

export class PhoneDetector implements Detector {
  name = "PhoneDetector";

  detect(text: string): Detection[] {
    const detections: Detection[] = [];

    let match;
    while ((match = PHONE_REGEX.exec(text)) !== null) {
      detections.push({
        type: "PHONE",
        category: "PII",
        match: match[0],
        start: match.index!,
        end: match.index! + match[0].length,
        priority: 9,
      });
    }

    return detections;
  }
}