
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../Actions/API/useAPI';
import ResetPasswordRequestForm from '../Components/ResetPassword/ResetPasswordRequestForm'
import React from 'react';

const ResetPasswordRequest = () => {

  const navigate = useNavigate()
  const {jsonWebToken} = useAPI();

  React.useEffect(() => {
    if (jsonWebToken !== null) {
      navigate('/ppllss')
    }
  }, [jsonWebToken, navigate])

  return (
    <>
        {jsonWebToken || <ResetPasswordRequestForm/>}
    </>
  )
}

export default ResetPasswordRequest