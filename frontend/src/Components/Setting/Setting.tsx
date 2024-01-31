import React from 'react';
import {
  Avatar,
  IconButton,
  CardContent,
  Card,
  TextField,

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { useLanguage } from '../../Config/Languages/useLanguage';
import { LanguageConfig } from '../../Config/Languages/LanguageProvider';
import { PhotoCamera, SaveOutlined } from '@mui/icons-material';
import { UserInfo, UserInfoFormValues } from '../../Types/inedx';
import { useForm } from 'react-hook-form';
import { useAPI } from '../../Actions/API/useAPI';
import { toast } from 'react-toastify';
import LodingInButton from '../Loading/LodingInButton';
const SettingsMenu: React.FC<{
  userInfo: UserInfo;
}> = ({ userInfo }) => {
  const [isPending, setIsPending] = React.useState<boolean>(false)
  const [editing, setEditing] = React.useState<boolean>(false);
  const [profileImageView, setProfileImageView] = React.useState<string>('');
  const [profileImageFile, setProfileImageFile] = React.useState<File | null>(null)
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>(() => {
    return language === 'FA' ? (FA as LanguageConfig) : (EN as LanguageConfig);
  }, [EN, FA, language]);
  const {updateUser} = useAPI();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0])
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setProfileImageView(e.target?.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const formRef = React.useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoFormValues>({
    defaultValues: {
      username: userInfo ? userInfo.username : "",
      biography: userInfo ? userInfo.biography : "",
      firstName: userInfo ? userInfo.firstName : "",
      lastName: userInfo ? userInfo.lastName : "",
      phone: userInfo ? userInfo.phone : "",
    },
  });  const handleDeleteProfileImage = () => {
    setProfileImageView(''); 
  };



  return (
    <div className='flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700 bg-opacity-90'>
      <Card className='max-w-xs mx-auto h-full w-[400px] flex items-start justify-center gap-5'>
        <CardContent className='flex flex-col items-center p-4'>
        <IconButton
            aria-label='edit'
            size='small'
            onClick={() => {
              console.log('c', editing);
              if (editing) {
                formRef.current && handleSubmit(
                  async (data: UserInfoFormValues, event?: React.BaseSyntheticEvent) => {
                    setIsPending(true)
                    event?.preventDefault();
                    const res = updateUser === null ? {success: false, message: "unknown error", data: undefined} : await updateUser(data, profileImageFile as File, false);
                    if (res.success) toast.success(languageConfig.snackbars.updateUserInfoSuccess,  {
                      position: toast.POSITION.TOP_CENTER,
                    })
                    else toast.error(languageConfig.snackbars.updateUserInfoError,  {
                      position: toast.POSITION.TOP_CENTER,
                    })
                    setEditing(false);
                    setIsPending(false)
                  }
                )()
              } else {
                setEditing(true);
              }
            }}
            sx={{
              marginTop: 'auto',
            }}
          >
            
            {!isPending && editing && <SaveOutlined/>}
            {!isPending && !editing && <EditIcon/>}
            {isPending && <LodingInButton/>}           
          </IconButton>

          <div className='flex flex-col items-center border border-blue-200 mb-4 p-1 w-full rounded-lg bg-blue-200'>
          <input
            accept='image/*'
            type='file'
            onChange={handleImageChange}
            id='icon-button-file'
            style={{ display: 'none' }}
          />
          <Avatar
            alt={userInfo.username}
            src={profileImageView}
            sx={{ width: '100px', height: '100px', marginBottom: 2 }}
            variant='rounded'
          />
          {editing &&  (
            <div className='flex flex-row gap-2'>
              <label htmlFor='icon-button-file'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <PhotoCamera /> 
                </IconButton>
              </label>
              <IconButton
                color='error'
                aria-label='delete picture'
                onClick={handleDeleteProfileImage}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          </div>

          <form
          ref={formRef}
            className='flex flex-col gap-4 items-center justify-center border border-blue-200 p-4 w-full bg-blue-200 rounded-lg'
          >
            <TextField
              label={languageConfig.forms.username}
              {...register('username', {
                required: languageConfig.forms.errorMessages.username,
              })}
              error={!!errors.username}
              helperText={errors.username ? languageConfig.forms.errorMessages.username : ''}
              fullWidth
              disabled={!editing}
            />
            <div className='flex flex-row gap-2'>
              <TextField
                label={languageConfig.forms.firstName}
                type={``}
                {...register('firstName', {
                  required: languageConfig.forms.errorMessages.firstName,
                })}
                error={!!errors.firstName}
                helperText={errors.firstName ? languageConfig.forms.errorMessages.firstName : ''}
                disabled={!editing}
              />
              <TextField
                label={languageConfig.forms.lastName}
                type={``}
                {...register('lastName')}
                disabled={!editing}
              />
            </div>
            <TextField
              label={languageConfig.forms.phone}
              {...register('phone', {
                required: languageConfig.forms.errorMessages.phone,
              })}
              error={!!errors.phone}
              fullWidth
              helperText={errors.phone ? languageConfig.forms.errorMessages.phone : ''}
              disabled={!editing}
            />
            <TextField
              label={languageConfig.forms.bio}
              multiline
              rows={4}
              fullWidth
              {...register('biography')}
              disabled={!editing}
            />
            {/* {editing && (
              <Button
                type='submit'
                variant={`contained`}
                startIcon={<SaveOutlined />}
              >
                Save
              </Button>
            )} */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsMenu;
