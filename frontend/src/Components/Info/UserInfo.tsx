import { TextField, IconButton, Avatar, Typography, Button, Badge } from '@mui/material';
import React from 'react';
import ContactList from '../Contacts/ContactList';
import { Search } from '@mui/icons-material';

const UserInfo = () => {
  return (
    <div className='flex flex-col rounded-2xl border-blue-500 bg-white/70 backdrop-blur-sm mt-[100px]'>

      <div className='flex flex-col items-center justify-center p-3 gap-3'>
        <Badge variant='dot' color="primary">
        <Avatar></Avatar>
        </Badge>
        <Typography>last seen</Typography>

        <Typography className='flex flex-col border-2 p-3 border-blue-500 rounded-lg w-full items-center justify-center'>Username</Typography>
        <Typography className='flex flex-col border-2 p-3 border-blue-500 rounded-lg w-full items-center justify-center'>Name</Typography>

        <Typography className='flex flex-col border-2 p-3 border-blue-500 rounded-lg w-full items-center justify-center' >phone number</Typography>

      </div>

      <div>
      <Button color="primary">
        add contact
      </Button>
      <Button color="error">
        Delete chat
      </Button>

      </div>
    </div>
  );
};

export default UserInfo;
