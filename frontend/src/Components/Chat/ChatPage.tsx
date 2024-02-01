import React, { useEffect, useRef } from 'react';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';

const ChatPagePV: React.FC<{userImage: string, userName: string, children: React.ReactNode}> = ({ userImage, userName, children }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [children]); // Scroll to bottom every time children change
  
  return (
    <div className="container mx-auto p-4 h-[500px]">
      <div className="flex items-center p-4 border-b-2">
        <Avatar alt="User Image" src={userImage} />
        <div className="ml-4">
          <p className="font-semibold">{userName}</p>
          <p className="text-gray-500">Last Seen Yesterday 11:00 AM</p>
        </div>
      </div>

      <div className="messages p-4 h-full overflow-y-auto">
        {children}
        {/* Invisible element to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area p-4 border-t-2">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button variant="contained" sx={{ ml: 1 }}>FILE</Button>
          <ChatBubbleOutline sx={{ mr: 1, my: 0.5 }} />
          <TextField id="input-message" label="Type a message" variant="standard" fullWidth />
          <Button variant="contained" sx={{ ml: 1 }}>Send</Button>
        </Box>
      </div>
    </div>
  );
};

const ChatPageGroup: React.FC<{gpImage: string, gpName: string, children: React.ReactNode}> = ({ gpImage, gpName, children }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [children]); // Scroll to bottom every time children change
  
  return (
    <div className="container mx-auto p-4 h-full">
      <div className="flex items-center p-4 border-b-2">
        <Avatar alt="User Image" src={gpImage} />
        <div className="ml-4">
          <p className="font-semibold">{gpName}</p>
        </div>
      </div>

      <div className="messages p-4 h-[80%] overflow-y-auto">
        {children}
        {/* Invisible element to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area p-4 border-t-2">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button variant="contained" sx={{ ml: 1 }}>FILE</Button>

          <ChatBubbleOutline sx={{ mr: 1, my: 0.5 }} />
          <TextField id="input-message" label="Type a message" variant="standard" fullWidth />
          <Button variant="contained" sx={{ ml: 1 }}>Send</Button>
        </Box>
      </div>
    </div>
  );
};
export {ChatPagePV, ChatPageGroup};
