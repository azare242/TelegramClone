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

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<number>(-1);

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
    setSuccess(1);
  };

  return (
    <div className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField label={`Username`} color={`primary`} {...register("username", { required: "Username is required" })} error={!!errors.username} helperText={errors.username?.message} />
        <TextField label={`Password`} type={`${showPassword ? "" : "password"}`} {...register("password", { required: "Password is required" })} error={!!errors.password} helperText={errors.password?.message} />
        <FormControlLabel control={<Checkbox onChange={(e) => setShowPassword(e.target.checked)} />} label="Show Password" />
        <Link to={`/requestresetpassword`} >
          <Button variant={`outlined`} className="w-full">Forgot Password</Button>
        </Link>
        <Button variant={`contained`} type="submit">
          Login
        </Button>
      </form>
      <Link to={`/signup`}>
        <Button variant={`text`}>Signup</Button>
      </Link>

      <Snackbar open={success !== -1} autoHideDuration={5000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={closeSnackBarHandler}>
        <Alert severity={success === 1 ? "success" : "error"} onClose={closeSnackBarHandler}>
          {success === 1
            ? "Login Successful, you will navigate to the main page"
            : "Information is incorrect"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
