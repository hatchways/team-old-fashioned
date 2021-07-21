export interface Notifications {
  notifications: Array<{
    _id: string;
    type: string;
    senderId: string;
    receiverId: string;
    contestId?: string;
    submissionId?: string;
    timeSent: Date | string;
    readStatus: boolean;
    photo: string;
  }>;
}
