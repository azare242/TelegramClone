import React from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { ResetPasswordValues } from "../../Types/inedx";
import { useLanguage } from "../../Config/Languages/useLanguage";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState<number>(-1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordValues>();
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
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<ResetPasswordValues> = (
    data: ResetPasswordValues
  ) => {
    setSuccess(data.password === data.confirmPassword ? 1 : 0);
  };

  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          type={showPassword ? "text" : "password"}
          label={languageConfig.forms.password}
          {...register("password", {
            required: languageConfig.forms.errorMessages.password,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label={languageConfig.forms.confirmPassword}
          {...register("confirmPassword", {
            required: languageConfig.forms.errorMessages.confirmPassword,
            validate: (value) =>
              value === watch("password", "") ||
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
        <Button variant={`contained`} style={{ width: "100%" }} type="submit">
          {languageConfig.submit}
        </Button>
      </form>
      <Snackbar
        open={success !== -1}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeSnackBarHandler}
      >
        {
          <Alert severity={success === 1 ? "success" : "error"}>
            {success === 1
              ? languageConfig.snackbars.resetPasswordSuccess
              : languageConfig.snackbars.registerError}
          </Alert>
        }
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
