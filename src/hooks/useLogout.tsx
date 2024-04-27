import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../api/Api"
export const useLogout = (setState: (arg0: any) => void, initialState: any) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    console.log('aici')
    localStorage.removeItem('token')
    Api.defaults.headers.common.Authorization = '';
    setState(initialState);
    navigate("/login", {replace: true})
  }, [initialState, navigate, setState])

  return {logout}
}
