import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";

import { LoginFormValues } from "../../Types/inedx";
import { useLanguage } from "../../Config/Languages/useLanguage";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<number>(-1);
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === "FA") return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);
  const closeSnackBarHandler = () => {
    switch (success) {
      case 0:
        setSuccess(-1);
        break;
      case 1:
        setSuccess(-1);
        navigate("/"); // Navigate to the main page or any other desired route
        break;
      default:
        setSuccess(-1);
        break;
    }
  };

  const onSubmit: SubmitHandler<LoginFormValues> = (data: LoginFormValues) => {
    // Add your login logic here
    // For example, you can send a request to your authentication API
    // and handle success or error accordingly
    console.log(data);
    setSuccess(1);
  };

  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700 bg-opacity-90`}
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
        <Button variant={`contained`} type="submit">
          {languageConfig.login}
        </Button>
      </form>
      <Link to={`/signup`} className="w-full">
        <Button variant={`text`} fullWidth>
          {languageConfig.signup}
        </Button>
      </Link>

      <Snackbar
        open={success !== -1}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeSnackBarHandler}
      >
        <Alert
          severity={success === 1 ? "success" : "error"}
          onClose={closeSnackBarHandler}
        >
          {success === 1
            ? languageConfig.snackbars.loginSucces
            : languageConfig.snackbars.loginError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
