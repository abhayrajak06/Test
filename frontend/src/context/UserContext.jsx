import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("token");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const storedUser = localStorage.getItem("token");
      if (storedUser) {
        // You may want to implement token validation logic here
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
