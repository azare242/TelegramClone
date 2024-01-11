import React from "react";
import axios from 'axios';
import { API_ROUTES, BASE_URL_HTTP } from "./Routes";

export const ApiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [jsonWebToken, setJsonWebToken] = React.useState<string | null>(
    (localStorage.getItem("mytel-jwt") as string) !== null
      ? (localStorage.getItem("mytel-jwt") as string)
      : null
  );
  
  React.useEffect(() => {
    jsonWebToken
      && localStorage.setItem("mytel-jwt", jsonWebToken)
    
  }, [jsonWebToken]);




  const login = React.useCallback(async (username: string, password: string, mock: boolean = false) => {

    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/login" : `${BASE_URL_HTTP}${API_ROUTES.login.path}`,
        method: mock ? "POST" : API_ROUTES.login.method,
        data: {username, password}
      })

      if (res.status === 200) {
        setJsonWebToken(res.data.access_token)
        return {success: true, message: "login successfully"}
      } else if (res.status === 401) {

        return {success: false, message: "wrong password"}
      } else if (res.status === 404) {
        return {success: false , message: "user not found"}
      }
    } catch (e: any) {
      console.log(e)
      return {success: false, message: e.response.data.message}
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("mytel-jwt")
    setJsonWebToken(null);
  }
  const context = {
    jsonWebToken,
    login,
    logout,
  };

  return <APIContext.Provider value={context}>{children}</APIContext.Provider>;
};

interface APIContextInterface {
  jsonWebToken: string | null;
  login:( (username: string, password: string, mock?: boolean) => Promise<{
    success: boolean;
    message: string;
} | undefined>) | null
  logout: (() => void) | null
}
export const APIContext = React.createContext<APIContextInterface>({
  jsonWebToken: "",
  login: null,
  logout: null
});
