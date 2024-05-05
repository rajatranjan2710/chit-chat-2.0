import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { user } = useSelector((state) => state.auth);
  // const user = localStorage.getItem("user");

  const newUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (newUser) {
      if (socket == null) {
        // console.log("socket is intializing");
        const newSocket = io("http://localhost:8080", {
          query: {
            userId: newUser._id,
            userName: newUser.fullName,
          },
        });

        setSocket(newSocket);

        return () => {
          if (newSocket) {
            console.log("cleaning socket");
            newSocket.close();
          }
        };
      }
    } else {
      // console.log("user is now logged out");
      if (socket != null) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  // console.log(socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
