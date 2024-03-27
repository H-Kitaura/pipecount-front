export interface Point {
  id: number;
  labelId: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
  score: number | null;
}

export interface Annotation {
  points: Point[];
  imageBase64: string;
  imageFilename: string | null;
}

export interface Feedback {
  before: Annotation;
  after: Annotation;
}

// export interface User {
//   id?: number;
//   username: string;
//   first_name?: string;
//   last_name?: string;
//   organization?: string;
//   description?: string;
//   address?: string;
//   mobile?: string;
//   email?: string;
//   // hashed_password?: string;
//   postal?: string;
//   pref?: string;
//   city?: string;
//   device?: number;
//   window_size?: number;
//   activated?: boolean;
//   disabled?: boolean;
//   last_accessed?: string;
//   role?: string;
//   password: string;
// }

export interface User {
  username: string;
  password: string;
  scope: string;
}

export interface AlertMessage {
  status: string;
  message: string;
}
