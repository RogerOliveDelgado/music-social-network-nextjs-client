
export interface Response {
  ok: boolean;
  data: Playlist[];
}

export interface Playlist {
  _id: string;
  title: string;
  description: string;
  image: string;
  isPublic: boolean;
  tracks: Track[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Track {
  _id: string;
  title: string;
  duration: number;
  trackNumber: number;
  trackAudio: string;
  album: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
