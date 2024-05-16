"use client";

import { createContext, useState } from "react";

// creating AuthContext with default empty values
export const AuthContext = createContext({});

// AuthProvider component to provide AuthContext to its children
export default function AuthProvider({ children }) {
  // state varibale for user
  const [user, setUser] = useState(null);

  // function to set user when logged in
  const login = (user) => {
    setUser(user);
  };

  // function to clear user when logged out
  const logout = () => {
    setUser(null);
  };

  // providing values to AuthContext
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
