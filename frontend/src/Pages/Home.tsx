import { Alert, Snackbar } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {Button} from '@mui/material'
import TEL from '../assets/icons8-telegram-96.png'
import { useAPI } from "../Actions/API/useAPI";
import React from "react";
import { LanguageConfig } from "../Config/Languages/LanguageProvider";
import { useLanguage } from "../Config/Languages/useLanguage";

const HomePage = () => {
  const {language, FA, EN} = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>(() : LanguageConfig  => {
    if (language === "FA") return FA as LanguageConfig
    else return EN as LanguageConfig
  }, [EN, FA, language]);
  const [searchParams] = useSearchParams();
  const login_error: boolean =
    searchParams.get("login_error") === "1" ? true : false;
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] w-[45rem] mt-[5rem] border-2  bg-slate-700 rounded-2xl border-blue-500 gap-10">
    <div className="w-[15rem] flex flex-col items-center justify-center text-center gap-4">
        <img src={TEL} alt='app' className="rounded-2xl hover:shadow-lg hover:shadow-slate-1000 hover:bg-slate-100"/>  
        <p>
          {languageConfig.welcome.wlto}
          <br/>
          {languageConfig.welcome.by}<br/> <span className="hover:text-green-500">{languageConfig.welcome.green}</span> <br/>{languageConfig.welcome.and}<br/> {languageConfig.welcome.sdq}
          </p>
    </div>
    <div className="w-[75%] flex items-center justify-center gap-5"> 
      <Link to="/login">
        <Button variant="contained"> {languageConfig.login} </Button>
      </Link>
      <Link to="/signup">
        <Button variant="contained"> {languageConfig.signup} </Button>
      </Link>
    </div>

    <Snackbar
      open={login_error}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={`error`} sx={{ width: "100%" }}>
        {languageConfig.snackbars.pleaseLogin}
      </Alert>
    </Snackbar>
  </div>
  )
};
const Home = () => {

    
  const navigate = useNavigate()
  const {jsonWebToken} = useAPI();

  React.useEffect(() => {
    if (jsonWebToken !== null) {
      navigate('/ppllss')
    }
  }, [jsonWebToken, navigate])


  return (
    <>
    {
      jsonWebToken || <HomePage/>
    }
    </>
  );
};

export default Home;
