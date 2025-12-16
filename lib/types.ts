export interface CensorResult {
  originalText: string;
  censoredText: string;
  censoredWords: CensoredWord[];
  fileName: string;
}

export interface CensoredWord {
  word: string;
  positions: number[];
}

export interface UploadResponse {
  success: boolean;
  data?: CensorResult;
  error?: string;
}
