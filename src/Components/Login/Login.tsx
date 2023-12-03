import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const navigate = useNavigate();
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

  return (
    <div
      className={`flex flex-col items-center justify-between m-60 p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}
    >
      <TextField label={`Username`} color={`primary`}></TextField>
      <TextField
        label={`Password`}
        type={`${showPassword ? "" : "password"}`}
      ></TextField>
      <FormControlLabel
        control={
          <Checkbox onChange={(e) => setShowPassword(e.target.checked)} />
        }
        label="Show Password"
      />
      <Link to={`/requestresetpassword`}>
        <Button variant={`outlined`}>Forgot Password</Button>
      </Link>
      <Button variant={`contained`} onClick={() => setSuccess(0)}>
        Login
      </Button>
      <Link to={`/signup`}>
        <Button variant={`text`}>Signup</Button>
      </Link>

      <Snackbar
        open={success !== -1}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeSnackBarHandler}
      >
        {
          <Alert severity={success === 1 ? "success" : "error"}>
            {success === 1
              ? "Register Successfully, you will nevigate to main page"
              : "Information is incorrect"}
          </Alert>
        }
      </Snackbar>
    </div>
  );
};

export default Login;
