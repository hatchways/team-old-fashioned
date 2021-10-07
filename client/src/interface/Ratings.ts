export interface Rating {
  _id: string;
  raterId: ID;
  numericalRating: number;
  textRating: string;
  submissionId: SubmissionID;
  contestId: ContestID;
  artistId: ID;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ID {
  _id: string;
  username: string;
  profilePicUrl: string;
}

export interface ContestID {
  _id: string;
  title: string;
}

export interface SubmissionID {
  files: string[];
  _id: string;
}

export interface RatingsArray {
  ratings: Rating[];
}
