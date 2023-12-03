import React from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
const ResetPasswordRequest = () => {
  const [success, setSuccess] = React.useState<number>(-1);

  const closeSnackBarHandler = () => {
    switch (success) {
      case 0:
        setSuccess(-1);
        break;
      case 1:
        setSuccess(-1);
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
      <TextField type={`text`} label={`Email`} />
      <Button
        variant={`contained`}
        style={{ width: "100%" }}
        onClick={() => setSuccess(1)}
      >
        Submit
      </Button>
      <div
        className={`flex flex-row gap-2 w-[100%] items-center justify-between`}
      >
        <Link to={`/login`}>
          <Button variant={`text`}>Login</Button>
        </Link>
        <Link to={`/signup`}>
          <Button variant={`text`}>Signup</Button>
        </Link>
      </div>

      <Snackbar
        open={success !== -1}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeSnackBarHandler}
      >
        {
          <Alert severity={success === 1 ? "success" : "error"}>
            {success === 1
              ? "Resetpassword Successfully, check your email"
              : "Can not find user with this email"}
          </Alert>
        }
      </Snackbar>
    </div>
  );
};

export default ResetPasswordRequest;
