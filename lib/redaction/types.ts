export interface Detection {
  type: string;
  category: string;
  match: string;
  start: number;
  end: number;
  priority: number;
}