import { Detection } from "./types";

export function normalize(detections: Detection[]): Detection[] {
  const sorted = detections.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    if (a.priority !== b.priority) return b.priority - a.priority;
    return (b.end - b.start) - (a.end - a.start);
  });

  const result: Detection[] = [];

  for (const current of sorted) {
    const last = result[result.length - 1];

    if (!last || current.start >= last.end) {
      result.push(current);
    }
  }

  return result;
}