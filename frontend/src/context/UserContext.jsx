import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../url";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const res = await axios.get(URL + "/api/v1/auth/refetch", {
          withCredentials: true,
        });
        setUser(res?.data);
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
