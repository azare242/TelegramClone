import React from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const ResetPassword = () => {
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
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}
    >
      <TextField type={showPassword ? "text" : "password"} label={`Password`} />
      <TextField
        type={showPassword ? "text" : "password"}
        label={`Confirm Password`}
      />
      <FormControlLabel
        control={
          <Checkbox onChange={(e) => setShowPassword(e.target.checked)} />
        }
        label="Show Password"
      />
      <Button
        variant={`contained`}
        style={{ width: "100%" }}
        onClick={() => setSuccess(1)}
      >
        Submit
      </Button>
      <Snackbar
        open={success !== -1}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeSnackBarHandler}
      >
        {
          <Alert severity={success === 1 ? "success" : "error"}>
            {success === 1
              ? "Resetpassword Successfully, you will navigate to login page"
              : "Error In password"}
          </Alert>
        }
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
