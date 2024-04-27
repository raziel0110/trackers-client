import { type ReactNode, createContext, useContext, useState, useEffect, useCallback } from "react";
import { LOGIN_URL } from "../api/routes";
import axios from "axios";
import Api from "../api/Api";
import { decryptToken, isValidToken } from "../utils/TokenStorage";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

type AuthProps = {
  children: ReactNode;
}

export interface AuthState {
  exp: number | null;
  username: string | null;
  authenticated: boolean;
}

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
}

const initialState = {
  exp: null,
  username: null,
  authenticated: false,
}

const AuthProvider = ({children}: AuthProps) => {
  const [state, setState] = useState<AuthState>(initialState);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate()
  const {logout} = useLogout(setState, initialState)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const data = decryptToken(token);
      if (!isValidToken(data.exp)) {
        logout();
      }
      setState({
        exp: data.exp,
        username: data.username,
        authenticated: true,
      });
      navigate("/", {replace: true})
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [navigate, logout])

  const login = async (email: string, password: string) => {
    try {
      const response = await Api.post(LOGIN_URL, {email, password});
      setState({
        exp: response.data.exp,
        username: response.data.username,
        authenticated: true,
      });
      localStorage.setItem('token', response.data.token);
      Api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      navigate("/", {replace: true})
    } catch (err: any) {
      setError(err.data);
    }
  }

  return <AuthContext.Provider value={{onLogin: login, onLogout: logout, error, authState: state}}>{children}</AuthContext.Provider>
};

export {AuthProvider, AuthContext};
