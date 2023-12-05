
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "../Components/ResetPassword/ResetPasswordForm"
import { useAPI } from "../Actions/API/useAPI";
import React from "react";
const ResetPassword = () => {


  const navigate = useNavigate()
  const {jsonWebToken} = useAPI();

  React.useEffect(() => {
    if (jsonWebToken !== null) {
      navigate('/ppllss')
    }
  }, [jsonWebToken, navigate])

  
  return (

    <>
        {jsonWebToken || <ResetPasswordForm/>}
    </>
  )
}

export default ResetPassword