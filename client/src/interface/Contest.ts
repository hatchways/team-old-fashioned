import { User } from './User';

export interface Contest {
  _id: string;
  description: string;
  prizeAmount: number;
  createDate: Date | string;
  endDate: Date | string;
  imageArray: string[];
}

export interface ContestAPIData {
  id: string;
  title: string;
  description: string;
  prizeAmount: number;
  deadline: Date;
  creator: User;
}
