export interface Point {
  id: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
  score: number | null;
}

export interface Annotation {
  points: Point[];
  imageBase64: string;
  imageFilename: string | null;
}
