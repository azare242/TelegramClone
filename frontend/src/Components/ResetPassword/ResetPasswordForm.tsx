import React from "react";
import { TextField, Button, Snackbar, Alert, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { ResetPasswordValues } from "../../Types/inedx";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState<number>(-1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordValues>();

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

  const onSubmit: SubmitHandler<ResetPasswordValues> = (data: ResetPasswordValues) => {
    setSuccess(data.password === data.confirmPassword ? 1 : 0)
  };


  return (
    <div className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          type={showPassword ? "text" : "password"}
          label={`Password`}
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label={`Confirm Password`}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === watch("password", "") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <FormControlLabel
          control={<Checkbox onChange={(e) => setShowPassword(e.target.checked)} />}
          label="Show Password"
        />
        <Button variant={`contained`} style={{ width: "100%" }} type="submit">
          Submit
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
              ? "Reset password Successfully, you will navigate to login page"
              : "Error in password"}
          </Alert>
        }
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
