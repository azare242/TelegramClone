// UserMessage.js
import React from 'react';
import { Paper, Avatar } from '@mui/material';

const UserMessage: React.FC<{text: string}> = ({ text }) => {
  return (
    <div className="flex justify-end mb-4">
      <Paper elevation={3} className="px-4 py-2 bg-blue-500 text-white max-w-xs rounded-lg">
        {text}
      </Paper>
    </div>
  );
};


const OtherUserMessage: React.FC<{text: string}> = ({ text }) => {
  return (
    <div className="flex justify-start mb-4 "> 
      <Paper elevation={3} className="px-4 py-2 max-w-xs rounded-lg bg-slate-700" sx={{backgroundColor: "aqua"}}>
        {text}
      </Paper>
    </div>
  );
};

const OtherUserMessageInGroup:  React.FC<{text: string, avatarSrc: string}> = ({ text, avatarSrc }) => {
    return (
      <div className="flex items-end mb-4">
        <Avatar alt="Other User" src={avatarSrc} className="mr-2" />
        <Paper elevation={3} className="px-4 py-2 bg-gray-300 max-w-xs rounded-lg" sx={{backgroundColor: "green",   color: "white"}}>
          {text}
        </Paper>
      </div>
    );
  };

export {UserMessage, OtherUserMessage, OtherUserMessageInGroup};
