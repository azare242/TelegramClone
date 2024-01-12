import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";
import { useAPI } from "../Actions/API/useAPI";
import React from "react";
const Login = () => {

  const navigate = useNavigate()
  const {jsonWebToken} = useAPI();

  React.useEffect(() => {
    if (jsonWebToken !== null) {
      navigate('/ppllss/pv')
    }
  }, [jsonWebToken, navigate])

  
  return (
    <>
      {jsonWebToken || <LoginForm/>}
    </>
  );
};

export default Login;
