"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  setAccessToken: (t: string) => {},
});

export const useAuthContext = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [token, setAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
