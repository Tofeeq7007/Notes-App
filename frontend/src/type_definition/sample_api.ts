// types.ts (or keep inline)
export interface Note {
  _id: string;
  title: string;
  userId: string;
  __v: number;
}

export interface GetContentResponse {
  content: Note[];
}

export interface AddContentResponse {
  message: string;
  currentContentId: string;
  title: string;
}
