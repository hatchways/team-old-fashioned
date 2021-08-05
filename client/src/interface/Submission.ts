export interface Submission {
  _id: string;
  name: string;
  files: string[];
  isOwner: boolean;
  ownerName: string;
  title: string;
  description: string;
  prizeAmount: number;
  profilePicUrl: string;
}
