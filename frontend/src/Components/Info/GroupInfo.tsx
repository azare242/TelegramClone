import { TextField, IconButton, Avatar, Typography, Button } from '@mui/material';
import React from 'react';
import ContactList from '../Contacts/ContactList';
import { Search } from '@mui/icons-material';

const GroupInfo = () => {
  return (
    <div className='flex flex-col rounded-2xl border-blue-500 bg-white/70 backdrop-blur-sm mt-[100px]'>
      <div>
      <Button color="primary">
        add contact
      </Button>
      <Button color="error">
        Delete chat
      </Button>

      </div>
      <div className='flex flex-col items-center justify-center p-3 gap-3'>
        <Avatar></Avatar>
        <div className='flex flex-col'>
        </div>
        <Typography>Username</Typography>
        <Typography>Name</Typography>

        <Typography>phone number</Typography>

      </div>


    </div>
  );
};

export default GroupInfo;
