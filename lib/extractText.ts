import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export type SupportedFileType = "pdf" | "docx" | "txt";

export function detectFileType(
  mimeType?: string | null,
  filename?: string | null
): SupportedFileType {
  const normalizedMime = mimeType?.toLowerCase() ?? "";

  if (normalizedMime.includes("pdf")) return "pdf";
  if (
    normalizedMime.includes("word") ||
    normalizedMime.includes("officedocument.wordprocessingml.document")
  ) {
    return "docx";
  }
  if (normalizedMime === "text/plain") return "txt";

  const ext = filename ? path.extname(filename).toLowerCase() : "";
  switch (ext) {
    case ".pdf":
      return "pdf";
    case ".docx":
      return "docx";
    case ".txt":
      return "txt";
    default:
      throw new Error("Unsupported file type. Only PDF, DOCX, and TXT are allowed.");
  }
}

export async function extractTextFromFile(
  filePath: string,
  mimeType?: string | null,
  filename?: string | null
): Promise<string> {
  const type = detectFileType(mimeType, filename);

  switch (type) {
    case "pdf": {
      const buffer = await fs.readFile(filePath);
      const result = await pdfParse(buffer);
      return result.text.trim();
    }
    case "docx": {
      const buffer = await fs.readFile(filePath);
      const result = await mammoth.extractRawText({ buffer });
      return result.value.trim();
    }
    case "txt": {
      const content = await fs.readFile(filePath, "utf8");
      return content.trim();
    }
    default:
      throw new Error("Unsupported file type");
  }
}




