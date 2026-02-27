import { Detection } from "../types";

export interface Detector {
  name: string;
  detect(text: string): Detection[];
}