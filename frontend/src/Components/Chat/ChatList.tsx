import { IconButton, TextField } from "@mui/material";
import ChatCard from "./ChatCard";
import { Search } from "@mui/icons-material";

const ChatCardList: React.FC<{
  chatItems: {
    from: string;
    image: string;
    lastMessage: string;
    time: string
  }[],
  link: string
}> = ({ chatItems, link }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between p-4">
        <TextField label={"Search"} color={`primary`} />
        <IconButton>
          <Search />
        </IconButton>
      </div>
      <div className="flex flex-col gap-0 overflow-y-auto rounded-lg h-full">
        {chatItems.map((chatItem, index) => (
          <ChatCard
            key={index} // Unique key for each child in a list
            username={chatItem.from}
            avatarSrc={chatItem.image}
            message={chatItem.lastMessage}
            time={chatItem.time}
            link={link}
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
