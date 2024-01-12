import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from '@mui/material';

import { RegisterFormValues } from '../../Types/inedx';
import { useLanguage } from '../../Config/Languages/useLanguage';
import { LanguageConfig } from '../../Config/Languages/LanguageProvider';
import LoadingInButton from '../Loading/LodingInButton';
import { useAPI } from '../../Actions/API/useAPI';
import { toast } from 'react-toastify';
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>();

  const { signup } = useAPI();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { language, FA, EN } = useLanguage();
  const [loading, setLoading] = React.useState<boolean>(false);
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === 'FA') return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (
    data: RegisterFormValues
  ) => {
    console.log(data);
    setLoading(true);
    const res =
      signup === null
        ? { success: false, message: 'unknown error', data: undefined }
        : await signup(data, true);

    if (res.success) {
      toast.success(languageConfig.snackbars.registerSuccess);
      navigate("/login")
    } else toast.error(languageConfig.snackbars.registerError);
    setLoading(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-white/30 backdrop-blur-sm`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <TextField
          label={languageConfig.forms.username}
          color={`primary`}
          type={`text`}
          {...register('username', {
            required: languageConfig.forms.errorMessages.username,
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label={languageConfig.forms.phone}
          color={`primary`}
          type={`tel`}
          {...register('phoneNumber', {
            required: languageConfig.forms.errorMessages.phone,
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <TextField
          label={languageConfig.forms.password}
          type={`${showPassword ? '' : 'password'}`}
          {...register('password', {
            required: languageConfig.forms.errorMessages.password,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label={languageConfig.forms.confirmPassword}
          type={`${showPassword ? '' : 'password'}`}
          {...register('confirmPassword', {
            required: languageConfig.forms.errorMessages.confirmPassword,
            validate: (value) =>
              value === watch('password') ||
              languageConfig.forms.errorMessages.passwordMissMatch,
          })}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword
              ? languageConfig.forms.errorMessages.passwordMissMatch
              : ''
          }
        />
        <FormControlLabel
          control={
            <Checkbox onChange={(e) => setShowPassword(e.target.checked)} />
          }
          label={languageConfig.showPassword}
        />
        <Button variant={`contained`} type='submit' disabled={loading}>
          {!loading ? languageConfig.signup : <LoadingInButton />}
        </Button>
      </form>
      <Link to={`/login`} className='w-full'>
        <Button variant={`text`} fullWidth>
          {languageConfig.login}{' '}
        </Button>
      </Link>
    </div>
  );
};

export default Register;
