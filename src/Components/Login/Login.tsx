import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div
      className={`flex flex-col items-center justify-between m-60 p-20 border-2 rounded-2xl border-blue-500 gap-4`}
    >
      <TextField label={`Username`} color={`primary`}></TextField>
      <TextField label={`Password`} type={`${showPassword ? "" : "password"}`}></TextField>
      <FormControlLabel control={<Checkbox onChange={(e) => setShowPassword(e.target.checked)}/>} label="Show Password" />
      <Link to={`/resetpassword`}>
      <Button variant={`outlined`}>Forgot Password</Button>
      </Link>
      <Button variant={`contained`}>Login</Button>
      <Link to={`/signup`}>
      <Button variant={`text`}>Signup</Button>
      </Link>
    </div>
  );
};

export default Login;
