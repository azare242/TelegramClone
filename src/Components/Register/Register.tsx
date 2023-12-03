import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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
  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}
    >
      <TextField label={`Username`} color={`primary`} type={`text`}></TextField>
      <TextField label={`Email`} color={`primary`} type={`email`}></TextField>
      <TextField
        label={`Phone Number`}
        color={`primary`}
        type={`tel`}
      ></TextField>
      <TextField
        label={`Password`}
        type={`${showPassword ? "" : "password"}`}
      ></TextField>
      <TextField
        label={`Confirm Password`}
        type={`${showPassword ? "" : "password"}`}
      ></TextField>
      <FormControlLabel
        control={
          <Checkbox onChange={(e) => setShowPassword(e.target.checked)} />
        }
        label="Show Password"
      />
      <Button variant={`contained`} onClick={() => setSuccess(1)}>
        Signup
      </Button>
      <Link to={`/login`}>
        <Button variant={`text`}>Login</Button>
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
              ? "Register Successfully, you will nevigate to login page"
              : "Check All fields"}
          </Alert>
        }
      </Snackbar>
    </div>
  );
};

export default Register;
