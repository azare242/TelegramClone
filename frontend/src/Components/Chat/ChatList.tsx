import { Button, IconButton, TextField } from "@mui/material";
import ChatCard from "./ChatCard";
import { Search } from "@mui/icons-material";

interface ChatItem {
  id: number;
  username: string;
  avatarSrc: string;
  message: string;
}

// Define the props for the ChatCardList component
interface ChatCardListProps {
  chatItems: ChatItem[];
}

const ChatCardList = ({ chatItems }: ChatCardListProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between p-4">
        <TextField label={"Search"} color={`primary`} />
        <IconButton>
          <Search />
        </IconButton>


      </div>
      <div className="flex flex-col gap-0 overflow-y-auto rounded-lg h-full">
        {chatItems.map((chatItem) => (
          <ChatCard
            key={chatItem.id} // Unique key for each child in a list
            username={chatItem.username}
            avatarSrc={chatItem.avatarSrc}
            message={chatItem.message}
          />
        ))}
      </div>
      {/* <div className="flex items-center justify-center flex-col">
          <Button>New Group</Button>
          <Button>New Chat</Button>
        </div> */}
    </div>
  );
};

export default ChatCardList;
