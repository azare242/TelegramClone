
import React from "react";
import SettingsMenu from "../Components/Setting/Setting";
import { useAPI } from "../Actions/API/useAPI";
import { UserInfo } from "../Types/inedx";
import LoadingInPage from "../Components/Loading/LoadingInPage";
import { toast } from "react-toastify";
const Settings = () => {

  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null)
  const { settingsPageInfo } = useAPI();
  React.useEffect(() => {
    async function fetch() {
      const res = settingsPageInfo === null ? {success: false, message: "unknown error", data: undefined} : await settingsPageInfo(true);
      console.log(res)
      if (res.success) {
        setUserInfo(res.data as UserInfo)
        setLoaded(true)
      } else {
        toast.error("something went wrong")
      }
      
    }

    fetch()
  }, [settingsPageInfo])

  return (
    <>{
      loaded ? 
       <SettingsMenu userInfo={userInfo as UserInfo}/>
   : <LoadingInPage/>
   } </>
  );
};

export default Settings;
