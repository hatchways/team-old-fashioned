export interface Contest {
  _id: string;
  description: string;
  prizeAmount: number;
  createDate: Date | string;
  endDate: Date | string;
  imageArray: string[];
}
