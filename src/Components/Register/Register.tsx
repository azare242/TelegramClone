import { TextField, FormControlLabel, Checkbox, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <div
    className={`flex flex-col items-center justify-between m-60 p-20 border-2 rounded-2xl border-blue-500 gap-4`}
  >
    <TextField label={`Username`} color={`primary`}></TextField>
    <TextField label={`Email`} color={`primary`}></TextField>
    <TextField label={`Phone Number`} color={`primary`}></TextField>
    <TextField label={`Password`} type={`${showPassword ? "" : "password"}`}></TextField>
    <TextField label={`Confirm Password`} type={`${showPassword ? "" : "password"}`}></TextField>
    <FormControlLabel control={<Checkbox onChange={(e) => setShowPassword(e.target.checked)}/>} label="Show Password" />
    <Button variant={`contained`}>Signup</Button>
    <Link to={`/login`}>
    <Button variant={`text`}>Login</Button>
    </Link>
  </div>
  )
}

export default Register