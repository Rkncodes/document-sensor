import type { VercelRequest, VercelResponse } from "@vercel/node";
import formidable, { File as FormidableFile } from "formidable";
import fs from "fs/promises";
import { censorText } from "../lib/censorText";
import { detectFileType, extractTextFromFile } from "../lib/extractText";

export const config = {
  api: {
    bodyParser: false,
  },
};

const DEFAULT_SENSITIVE = [
  "password",
  "secret",
  "ssn",
  "credit",
  "confidential",

  // privacy / internal
  "private",
  "classified",
  "restricted",
  "internal",
  "proprietary",

  // abuse / violence
  "abuse",
  "abusive",
  "kill",
  "killing",
  "murder",
  "murdered",
  "violence",
  "violent",
  "assault",
  "threat",
  "harassment"
];

function normalizeSensitiveWords(input?: string | string[]): string[] {
  if (!input) return DEFAULT_SENSITIVE;
  const raw = Array.isArray(input) ? input.join(",") : input;

  return raw
    .split(/[,\\n]/)
    .map((word) => word.trim())
    .filter(Boolean);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable({
    multiples: false,
    maxFileSize: 20 * 1024 * 1024, // 20MB limit
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ error: "Invalid form data", details: err.message });
      return;
    }

    const uploaded = (() => {
      const candidate = files.file as FormidableFile | FormidableFile[] | undefined;
      return Array.isArray(candidate) ? candidate[0] : candidate;
    })();

    if (!uploaded?.filepath) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    try {
      detectFileType(uploaded.mimetype, uploaded.originalFilename); // validate

      const text = await extractTextFromFile(
        uploaded.filepath,
        uploaded.mimetype,
        uploaded.originalFilename
      );

      const sensitiveWords = normalizeSensitiveWords(fields.sensitiveWords);
      const { censoredText, censoredCount } = censorText(text, sensitiveWords);

      res.status(200).json({
        originalText: text,
        censoredText,
        censoredCount,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Failed to process file", details: message });
    } finally {
      if (uploaded?.filepath) {
        void fs.unlink(uploaded.filepath).catch(() => undefined);
      }
    }
  });
}








