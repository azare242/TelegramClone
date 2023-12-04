import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { RegisterFormValues } from "../../Types/inedx";

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

  const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
    
    setSuccess(1);
  };

  return (
    <div className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextField label={`Username`} color={`primary`} type={`text`} {...register("username", { required: "Username is required" })} error={!!errors.username} helperText={errors.username?.message} />
        <TextField label={`Email`} color={`primary`} type={`email`} {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label={`Phone Number`} color={`primary`} type={`tel`} {...register("phoneNumber", { required: "Phone Number is required" })} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
        <TextField label={`Password`} type={`${showPassword ? "" : "password"}`} {...register("password", { required: "Password is required" })} error={!!errors.password} helperText={errors.password?.message} />
        <TextField label={`Confirm Password`} type={`${showPassword ? "" : "password"}`} {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === watch("password") || "Passwords do not match" })} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
        <FormControlLabel control={<Checkbox onChange={(e) => setShowPassword(e.target.checked)} />} label="Show Password" />
        <Button variant={`contained`} type="submit">
          Signup
        </Button>
      </form>
      <Link to={`/login`}>
        <Button variant={`text`}>Login</Button>
      </Link>

      <Snackbar open={success !== -1} autoHideDuration={5000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={closeSnackBarHandler}>
        <Alert severity={success === 1 ? "success" : "error"} onClose={closeSnackBarHandler}>
          {success === 1 ? "Register Successfully, you will navigate to the login page" : "Check all fields"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
