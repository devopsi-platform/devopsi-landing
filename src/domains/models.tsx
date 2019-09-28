export interface Song {
  id: string;
  title: string;
  author: string;
  duration: number;
}

export enum VoteType {
  like = "like",
  dislike = "dislike"
}

export interface Vote {
  id: string;
  songId: string;
  type: VoteType;
}
