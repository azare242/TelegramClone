import React from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
const ResetPassword = () => {
  return (
    <div
      className={`flex flex-col items-center justify-between m-60 p-20 border-2 rounded-2xl border-blue-500 gap-4`}
    >
      <TextField type={`text`} label={`Email`} />
      <Button variant={`contained`} style={{width: "100%"}}>Submit</Button>
      <div className={`flex flex-row gap-2 w-[100%] items-center justify-between`}>
        <Link to={`/login`}>
          <Button  variant={`text`}>Login</Button>
        </Link>
        <Link to={`/signup`} >
          <Button  variant={`text`}>Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
