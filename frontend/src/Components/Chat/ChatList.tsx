import ChatCard from "./ChatCard";

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
  
  const ChatCardList = ({ chatItems } : ChatCardListProps) => {
    return (
      <div className="flex flex-col gap-0 overflow-y-auto rounded-lg">
        {chatItems.map((chatItem) => (
          <ChatCard
            key={chatItem.id} // Unique key for each child in a list
            username={chatItem.username}
            avatarSrc={chatItem.avatarSrc}
            message={chatItem.message}
          />
        ))}
      </div>
    );
  };
  
  export default ChatCardList;