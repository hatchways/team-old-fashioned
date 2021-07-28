import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { Notification } from '../interface/Notifications';
import { FetchOptions } from '../interface/FetchOptions';

interface INotificationsContext {
  notifications: Notification[];
}

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: [],
});

export const NotificationsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // APICall currently inlined. Receiving null array in 'notifications' when importing APICall, although response shows receipt of notifications array.
    const getNotifications = async () => {
      const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
      };
      try {
        const response = await fetch(`/notifications`, fetchOptions);
        const json = await response.json();
        if (json) {
          setNotifications(json);
        }
      } catch (error) {
        console.log('Unable to connect to server. Please try again.', error);
      }
    };

    getNotifications();
  }, []);

  return <NotificationsContext.Provider value={{ notifications }}>{children}</NotificationsContext.Provider>;
};

export function useContest(): INotificationsContext {
  return useContext(NotificationsContext);
}
