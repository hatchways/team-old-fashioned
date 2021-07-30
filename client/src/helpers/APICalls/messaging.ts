import { FetchOptions } from '../../interface/FetchOptions';
import { MessagingAPIResponse } from '../../interface/Messaging';

export const fetchConversations = async (): Promise<MessagingAPIResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/conversation/all`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const fetchMessages = async (conversationId: string): Promise<MessagingAPIResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/conversation/${conversationId}/messages`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
