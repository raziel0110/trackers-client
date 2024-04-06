import { type ReactNode, createContext, useContext, useState } from "react";

type AuthProps = {
  children: ReactNode;
}

const AuthContext = createContext({});
const AuthProvider = ({children}: AuthProps) => {
  const [token, setToken] = useState<string>();

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;
