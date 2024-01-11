import React from "react";
import axios from 'axios';
import { API_ROUTES, BASE_URL_HTTP } from "./Routes";
import { LoginFormValues, RegisterFormValues, Response } from "../../Types/inedx";
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
    if (jsonWebToken !== null) localStorage.setItem("mytel-jwt", jsonWebToken)
    else localStorage.removeItem("mytel-jwt")
  }, [jsonWebToken]);

  const login = React.useCallback(async (form: LoginFormValues, mock: boolean = false): Promise<Response<undefined>> => {

    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/login" : `${BASE_URL_HTTP}${API_ROUTES.login.path}`,
        method: mock ? "POST" : API_ROUTES.login.method,
        data: {...form}
      })

      if (res.status === 200) {
        setJsonWebToken(res.data.access_token)
        return {success: true, message: "login successfully", data: undefined}
      } else if (res.status === 401) {
        return {success: false, message: "wrong password", data: undefined}
      } else if (res.status === 404) {
        return {success: false , message: "user not found", data: undefined}
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return {success: false, message: e.response.data.message, data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [])

  const logout = () => {
    setJsonWebToken(null);
  }

  const signup = React.useCallback( async (form: RegisterFormValues, mock: boolean = false): Promise<Response<undefined>> => {
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/register" : `${BASE_URL_HTTP}${API_ROUTES.register.path}`,
        method: mock ? "POST" : API_ROUTES.register.method,
        data: {...form}
      })

      if (res.status === 200) {
        return {success: true, message: "register successfully", data: undefined}
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return {success: false, message: e.response.data.message, data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [])
  const context = {
    jsonWebToken,
    login,
    logout,
    signup
  };

  return <APIContext.Provider value={context}>{children}</APIContext.Provider>;
};

interface APIContextInterface {
  jsonWebToken: string | null;
  login:( (form: LoginFormValues, mock?: boolean) => Promise<Response<undefined>>) | null
  logout: (() => void) | null
  signup: ((form: RegisterFormValues, mock?: boolean) => Promise<Response<undefined>>) | null
}
export const APIContext = React.createContext<APIContextInterface>({
  jsonWebToken: null,
  login: null,
  logout: null,
  signup: null
});
