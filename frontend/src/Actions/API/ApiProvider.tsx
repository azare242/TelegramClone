import React from "react";
import axios, { AxiosError } from 'axios';
import { API_ROUTES, BASE_URL_HTTP } from "./Routes";
import { LoginFormValues, LoginStatus, RegisterFormValues, Response, UserInfo, UserInfoFormValues, userProfile } from "../../Types/inedx";
import { objectToForm } from "../../Util/Converter";
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

  const login = React.useCallback(async (form: LoginFormValues, mock: boolean = false): Promise<Response<LoginStatus>> => {

    const formValuesData = objectToForm<LoginFormValues>(form)
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/login" : `${BASE_URL_HTTP}${API_ROUTES.login.path}`,
        method: mock ? "POST" : API_ROUTES.login.method,
        data: mock ? form : formValuesData 
      })


      if (res.status === 200) {
        console.log(res.data)
        setJsonWebToken(res.data.token)
        localStorage.setItem("mytel-userid", res.data.userID)
        localStorage.setItem("mytel-username", res.data.username)

        return {success: true, message: "login successfully", data: {isFirstLogin: res.data.isFirstLogin}}
      } else if (res.status === 401) {
        return {success: false, message: "wrong password", data: undefined}
      } else if (res.status === 404) {
        return {success: false , message: "user not found", data: undefined}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [])

  const logout = React.useCallback(async (): Promise<Response<undefined>>=> {
    const _tmp = `${jsonWebToken}`
    setJsonWebToken(null);
    localStorage.removeItem("mytel-userid")
    localStorage.removeItem("mytel-username")
    try {
      await axios.request({
        url: `${BASE_URL_HTTP}${API_ROUTES.logout.path}`,
        method:API_ROUTES.logout.method,
        headers: {
          "Authorization": `${_tmp}`
        }
      })


      return {success: true, message: "Logged Out", data: undefined}
    } catch (e) {
      if (e instanceof AxiosError){
        if (e.response?.status === 401) return {success: true, message: "Logged Out", data: undefined} 
        return {success: false, message: e.response?.data.message, data: undefined}
      
      }
      else return {success: false, message: "unknown error", data: undefined}
    }
  }, [jsonWebToken])

  const signup = React.useCallback( async (form: RegisterFormValues, mock: boolean = false): Promise<Response<undefined>> => {
    const formValuesData = objectToForm<RegisterFormValues>(form)
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/register" : `${BASE_URL_HTTP}${API_ROUTES.register.path}`,
        method: mock ? "POST" : API_ROUTES.register.method,
        data: mock ? {...form} : formValuesData
      })

      if (res.status === 201) {
        console.log(res.data)
        return {success: true, message: "register successfully", data: undefined}
      }
    } catch (e) {
      console.log(e)
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [])


  const settingsPageInfo = React.useCallback(async (mock: boolean = false): Promise<Response<UserInfo>> => {
    
    const userid = localStorage.getItem("mytel-userid")
    if (!userid) return {success: false, message: "unknown error", data: undefined}
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/userinfo" : `${BASE_URL_HTTP}${API_ROUTES.getUser.path.replace("$1", userid)}`,
        method: mock ? "GET" : "GET",
        headers: {
          "Authorization": `${mock ? "Bearer " : ""}${jsonWebToken}`
        }
      })

      if (res.status === 200) {
        console.log(res.data)
        return {success: true, message: "fetch successfully", data: {
          userID: res.data.userID,
          username: res.data.username,
          biography: res.data.biography,
          image: "",
          name: res.data.name,
          phone: res.data.phone
        }}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [jsonWebToken])


  const updateUser = React.useCallback(async (form: UserInfoFormValues,image: File | null ,mock: boolean = false) => {
    const formValuesData = objectToForm<UserInfoFormValues>(form)
    if (image) formValuesData.append("profile", image)
    console.log(image)
    const username = localStorage.getItem("mytel-username")
    if (!username) return {success: false, message: "unknown error", data: undefined}
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/updateuser" : `${BASE_URL_HTTP}${API_ROUTES.updateUser.path.replace("$1", username)}`,
        method: mock ? "PUT" : "PATCH",
        headers: {
          "Authorization": `${mock ? "Bearer " : ""}${jsonWebToken}`
        },
        data: mock ? {...form} : formValuesData
      })

      if (res.status === 200) {
        return {success: true, message: "fetch successfully", data: res.data.data}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [jsonWebToken])

  const getChats = React.useCallback(async (mock: boolean = false) : Promise<Response<unknown>> => {
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/chats" : `${BASE_URL_HTTP}${""}`,
        method: mock ? "GET" : "GET",
        headers: {
          "Authorization": `${mock ? "Bearer " : ""}${jsonWebToken}`
        },
      })

      if (res.status === 200) {
        return {success: true, message: "fetch successfully", data: res.data.data}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [jsonWebToken])
  const getGroups = React.useCallback(async (mock: boolean = false) : Promise<Response<unknown>> => {
    try {
      const res = await axios.request({
        url: mock ? "http://127.0.0.1:3000/mock/groups" : `${BASE_URL_HTTP}${""}`,
        method: mock ? "GET" : "GET",
        headers: {
          "Authorization": `${mock ? "Bearer " : ""}${jsonWebToken}`
        },
      })

      if (res.status === 200) {
        return {success: true, message: "fetch successfully", data: res.data.data}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [jsonWebToken])




  const deleteAccount = React.useCallback(async (): Promise<Response<undefined>> => {


    const userName = localStorage.getItem("mytel-username")
    if (!userName) return {success: false, message: "Unknown Error", data: undefined}
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.deleteUser.path.replace("$1", userName)}`,
        method: API_ROUTES.deleteUser.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },
      })
     if (res.status === 200) {
      setJsonWebToken(null);
      localStorage.removeItem("mytel-userid")
      localStorage.removeItem("mytel-username")
     } 
      return {success: true, message: "Deleted", data: undefined}
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [jsonWebToken])

  const getUserProfile = React.useCallback(async (id: string): Promise<Response<userProfile>> => {
    

    try {
      const res = await axios.request({
        url: `${BASE_URL_HTTP}${API_ROUTES.getUser.path.replace("$1", id)}`,
        method: API_ROUTES.getUser.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        }
      })

      if (res.status === 200) {
        console.log(res.data)
        return {success: true, message: "fetch successfully", data: res.data as userProfile}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}
  }, [jsonWebToken])


  const addContact = React.useCallback(async (user_name: string): Promise<Response<undefined>> => {
    const username = localStorage.getItem("mytel-username")
    if (!username) return {success: false, message: "unknown error", data: undefined}
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.addContact.path.replace("$1", username)}`,
        method: API_ROUTES.addContact.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },
        data: {username: user_name}
      })

      if (res.status === 201) {
        return {success: true, message: "add successfully", data: undefined}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}

  }, [jsonWebToken])

  const getContacts = React.useCallback(async (): Promise<Response<unknown>> => {
    const username = localStorage.getItem("mytel-username")
    if (!username) return {success: false, message: "unknown error", data: undefined}
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.getContats.path.replace("$1", username)}`,
        method: API_ROUTES.getContats.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },
      })

      if (res.status === 200) {
        return {success: true, message: "fetch successfully", data: res.data}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}

  }, [jsonWebToken])

  const deleteContact = React.useCallback(async (id: string): Promise<Response<undefined>> => {

    const username = localStorage.getItem("mytel-username")
    if (!username) return {success: false, message: "unknown error", data: undefined}
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.deleteContact.path.replace("$1", username).replace("$2", id)}`,
        method: API_ROUTES.deleteContact.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },

      })

      if (res.status === 200) {
        return {success: true, message: "delete successfully", data: undefined}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}


  }, [jsonWebToken])


  const startChat = React.useCallback(async (id: string): Promise<Response<undefined>> => {
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.createChat.path}`,
        method: API_ROUTES.createChat.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },
        data: objectToForm({id: id})
      })

      if (res.status === 201) {
        return {success: true, message: "start chat successfully", data: undefined}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}

  }, [jsonWebToken])


  const getChat = React.useCallback(async (id: string): Promise<Response<unknown>> => {
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.getChat.path.replace("$1", id)}`,
        method: API_ROUTES.getChat.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },
      })

      if (res.status === 200) {
        return {success: true, message: "fetch successfully", data: res.data}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}


  }, [jsonWebToken])
  const deleteChat = React.useCallback(async (id: string): Promise<Response<undefined>> => {
    try {
      const res = await axios.request({
        url:`${BASE_URL_HTTP}${API_ROUTES.deleteChat.path.replace("$1", id)}`,
        method: API_ROUTES.deleteChat.method,
        headers: {
          "Authorization": `${jsonWebToken}`
        },
      })

      if (res.status === 200) {
        return {success: true, message: "delete successfully", data: undefined}
      }
    } catch (e) {
      if (e instanceof AxiosError)
        return {success: false, message: e.response?.data.message, data: undefined}
      else return {success: false, message: "unknown error", data: undefined}
    }
    return {success: false, message: "unknown error", data: undefined}


  }, [jsonWebToken])
  const context: APIContextInterface = {
    jsonWebToken,
    login,
    logout,
    signup,
    settingsPageInfo,
    updateUser,
    getChats,
    getGroups,
    deleteAccount,
    getUserProfile,
    addContact,
    getContacts,
    deleteContact,
    startChat,
    getChat,
    deleteChat,
  };

  return <APIContext.Provider value={context}>{children}</APIContext.Provider>;
};

interface APIContextInterface {
  jsonWebToken: string | null;
  login:( (form: LoginFormValues, mock?: boolean) => Promise<Response<LoginStatus>>) | null
  logout: (() => Promise<Response<undefined>>) | null
  signup: ((form: RegisterFormValues, mock?: boolean) => Promise<Response<undefined>>) | null
  settingsPageInfo:  ((mock?: boolean) => Promise<Response<UserInfo>>) | null
  updateUser: ((form: UserInfoFormValues,image: File, mock?: boolean) => Promise<Response<undefined>>) | null
  getChats: ((mock?: boolean) => Promise<Response<unknown>>) | null
  getGroups: ((mock?: boolean) => Promise<Response<unknown>>) | null
  deleteAccount: (() => Promise<Response<undefined>>) | null 
  getUserProfile: ((id: string) => Promise<Response<userProfile>>) | null 
  addContact: ((user_name: string) => Promise<Response<undefined>>) | null
  getContacts: (()=> Promise<Response<unknown>>) | null
  deleteContact: ((id: string) => Promise<Response<undefined>>) | null
  startChat: ((id: string) => Promise<Response<undefined>>) | null
  getChat: ((id: string) => Promise<Response<unknown>>) | null
  deleteChat: ((id: string) => Promise<Response<undefined>>)| null
}
export const APIContext = React.createContext<APIContextInterface>({
  jsonWebToken: null,
  login: null,
  logout: null,
  signup: null,
  settingsPageInfo: null,
  updateUser: null,
  getChats: null,
  getGroups: null,
  deleteAccount: null,
  getUserProfile: null,
  addContact: null,
  getContacts: null,
  deleteContact: null,
  startChat: null,
  getChat: null,
  deleteChat: null
});
