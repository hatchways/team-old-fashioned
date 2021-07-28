export interface Contest {
  _id: string;
  ownerName: string;
  title: string;
  description: string;
  prizeAmount: number;
  createDate: Date | string;
  endDate: Date | string;
  imageArray: string[];
  profileImg: string;
}
