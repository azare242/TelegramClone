import { TextField, IconButton, Avatar, Typography, Button } from '@mui/material';
import React from 'react';
import ContactList from '../Contacts/ContactList';
import { Search } from '@mui/icons-material';

const GroupInfo = () => {
  return (
    <div className='flex flex-col rounded-2xl border-blue-500 bg-white/70 backdrop-blur-sm mt-[100px]'>
      <div>
      <Button color="primary">
        add member
      </Button>
      <Button color="error">
        Delete Group
      </Button>
      <Button color="error">
        Leave
      </Button>
      </div>
      <div className='flex flex-row items-center justify-center p-3 gap-3'>
        <Avatar></Avatar>
        <Typography>Group Name</Typography>
      </div>
      <div className='flex items-center justify-between p-4'>
        <TextField label={'Search'} color={`primary`} />
        <IconButton>
          <Search />
        </IconButton>
      </div>

      <ContactList
        contactItems={[
          {
            id: 1,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 2,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 3,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 4,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 5,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 6,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 7,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
          {
            id: 8,
            username: 'Alireza',
            avatarSrc: '',
            phone: '+989123456789',
          },
        ]}
      />
    </div>
  );
};

export default GroupInfo;
