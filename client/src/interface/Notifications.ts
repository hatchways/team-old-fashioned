export interface Notification {
  _id: string;
  type: string;
  senderId: {
    _id: string;
    username: string;
  };
  receiverId: string;
  contestId: {
    _id: string;
    title: string;
  };
  submissionId?: string;
  createdAt: Date;
  readStatus: boolean;
  photo: string;
}

export interface NotificationsArray {
  notifications: Notification[];
}
