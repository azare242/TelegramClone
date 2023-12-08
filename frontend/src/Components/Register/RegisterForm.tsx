import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { RegisterFormValues } from "../../Types/inedx";
import { useLanguage } from "../../Config/Languages/useLanguage";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>();

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
        navigate("/login");
        break;
      default:
        setSuccess(-1);
        break;
    }
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = (
    data: RegisterFormValues
  ) => {
    console.log(data);
    setSuccess(1);
  };

  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextField
          label={languageConfig.forms.username}
          color={`primary`}
          type={`text`}
          {...register("username", {
            required: languageConfig.forms.errorMessages.username,
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label={languageConfig.forms.email}
          color={`primary`}
          type={`email`}
          {...register("email", {
            required: languageConfig.forms.errorMessages.email,
            pattern: {
              value: /^\S+@\S+$/i,
              message: languageConfig.forms.errorMessages.email,
            },
          })}
          error={!!errors.email}
          helperText={
            errors.email
              ? languageConfig.forms.errorMessages.emailMissMatch
              : ""
          }
        />
        <TextField
          label={languageConfig.forms.phone}
          color={`primary`}
          type={`tel`}
          {...register("phoneNumber", {
            required: languageConfig.forms.errorMessages.phone,
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
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
        <TextField
          label={languageConfig.forms.confirmPassword}
          type={`${showPassword ? "" : "password"}`}
          {...register("confirmPassword", {
            required: languageConfig.forms.errorMessages.confirmPassword,
            validate: (value) =>
              value === watch("password") ||
              languageConfig.forms.errorMessages.passwordMissMatch,
          })}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword
              ? languageConfig.forms.errorMessages.passwordMissMatch
              : ""
          }
        />
        <FormControlLabel
          control={
            <Checkbox onChange={(e) => setShowPassword(e.target.checked)} />
          }
          label={languageConfig.showPassword}
        />
        <Button variant={`contained`} type="submit">
          {languageConfig.signup}
        </Button>
      </form>
      <Link to={`/login`} className="w-full">
        <Button variant={`text`} fullWidth>
          {languageConfig.login}{" "}
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
            ? languageConfig.snackbars.registerSuccess
            : languageConfig.snackbars.registerError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
