import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    const userData = {
      id: decoded["nameid"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      name: decoded["unique_name"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: decoded["email"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: decoded["role"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    };
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        login(token); 
      } catch (error) {
        logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
