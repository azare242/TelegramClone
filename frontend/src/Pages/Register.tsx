import { useNavigate } from 'react-router-dom';
import RegisterFrom from '../Components/Register/RegisterForm'
import { useAPI } from '../Actions/API/useAPI';
import React from 'react';
const Register = () => {


  const navigate = useNavigate()
  const {jsonWebToken} = useAPI();

  React.useEffect(() => {
    if (jsonWebToken !== null) {
      navigate('/ppllss/pv')
    }
  }, [jsonWebToken, navigate])


  return (
    <>
      { jsonWebToken || <RegisterFrom/>}
    </>
  );
};

export default Register;
