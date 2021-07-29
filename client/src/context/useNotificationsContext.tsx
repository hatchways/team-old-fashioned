import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { Notification } from '../interface/Notifications';
import { fetchNotifications } from '../helpers/APICalls/fetchNotifications';
import { useSocket } from './useSocketContext';

interface INotificationsContext {
  notifications: Notification[];
}

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: [],
});

export const NotificationsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetchNotifications();
      if (response) {
        setNotifications(response);
      }
    };
    if (socket) {
      socket.on('notification created', () => {
        getNotifications();
      });
      socket.on('loggedin', () => {
        getNotifications();
      });
    }
  }, [socket]);

  return <NotificationsContext.Provider value={{ notifications }}>{children}</NotificationsContext.Provider>;
};

export function useContest(): INotificationsContext {
  return useContext(NotificationsContext);
}
