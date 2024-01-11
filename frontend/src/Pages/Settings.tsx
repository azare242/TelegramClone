
import React from "react";
import SettingsMenu from "../Components/Setting/Setting";
import { useAPI } from "../Actions/API/useAPI";
import { UserInfo } from "../Types/inedx";
import LodingInButton from "../Components/Loading/LodingInButton";
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
      }
      
    }

    fetch()
  }, [settingsPageInfo])

  return (
    <>{
      loaded ? 
       <SettingsMenu userInfo={userInfo as UserInfo}/>
   : <div className="flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700 bg-opacity-90"><LodingInButton/></div>
   } </>
  );
};

export default Settings;
