import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,

  TextField,
} from "@mui/material";

import { LoginFormValues } from "../../Types/inedx";
import { useLanguage } from "../../Config/Languages/useLanguage";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";
import LodingInButton from "../Loading/LodingInButton";
import { useAPI } from "../../Actions/API/useAPI";
import { toast } from "react-toastify";
const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const {login} = useAPI()
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoding] = React.useState<boolean>(false)
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === "FA") return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);


  const onSubmit: SubmitHandler<LoginFormValues> =  async (data: LoginFormValues) => {
    // Add your login logic here
    // For example, you can send a request to your authentication API
    // and handle success or error accordingly
    setLoding(true)
    console.log(data);
    
    const res = login === null ? {success: false, message: "unknown error", data: undefined} : await login(data, true);

    if (res?.success) toast.success("success")
    else toast.error("unsuccess")

    setLoding(false);
  };

  
  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-white/30 backdrop-blur-sm`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label={languageConfig.forms.username}
          color={`primary`}
          {...register("username", {
            required: languageConfig.forms.errorMessages.username,
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label={languageConfig.forms.password}
          type={`${showPassword ? "" : "password"}`}
          {...register("password", {
            required: languageConfig.forms.errorMessages.password,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormControlLabel
          control={
            <Checkbox onChange={(e) => setShowPassword(e.target.checked)} />
          }
          label={languageConfig.showPassword}
        />
        <Button variant={`contained`} type="submit" disabled={loading}>
          {!loading ? languageConfig.login : <LodingInButton/>}
        </Button>
      </form>
      <Link to={`/signup`} className="w-full">
        <Button variant={`text`} fullWidth>
          {languageConfig.signup}
        </Button>
      </Link>


    </div>
  );
};

export default LoginForm;
