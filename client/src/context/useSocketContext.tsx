import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export interface IConnectedUser {
  email: string;
  socketId: string;
}

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  loggedInUsers: IConnectedUser[] | null;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  loggedInUsers: null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  const initSocket = useCallback(() => {
    console.log('trying to connect');
    setSocket(
      io('/', {
        withCredentials: true,
      }),
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('GET_USERS', (users) => {
        setLoggedInUsers(users);
      });
    }
  }, [socket, setLoggedInUsers]);

  return <SocketContext.Provider value={{ socket, initSocket, loggedInUsers }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
