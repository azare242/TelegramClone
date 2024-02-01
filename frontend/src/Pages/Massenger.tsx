import React from 'react';
import ChatCardList from '../Components/Chat/ChatList';
import MassengerLayout from '../Layouts/Massenger';
import { useAPI } from '../Actions/API/useAPI';
import LoadingInPage from '../Components/Loading/LoadingInPage';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatPageGroup, ChatPagePV } from '../Components/Chat/ChatPage';
import { OtherUserMessage, OtherUserMessageInGroup, UserMessage } from '../Components/Message/Message';
import _chats from '../mockdata/chat'
import _gp from '../mockdata/groups'
const Massenger: React.FC<{ openedChat: boolean }> = ({ openedChat }) => {
  const { getChats, getGroups } = useAPI();
  const { chattype } = useParams();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [chats, setChats] = React.useState<unknown | null>(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (chattype !== 'pv' && chattype !== 'group') {
      navigate('/ppllss');
    }

    const api = chattype === 'pv' ? getChats : getGroups;
    async function fetch() {
      const res =
        api === null
          ? { success: false, message: 'unknown error', data: undefined }
          : await api(false);

      if (res.success) {
        
        setChats(chattype === 'pv' ? _chats : _gp)

      }
      setLoaded(true)
    }
    fetch();
  }, [chattype, getChats, getGroups, navigate]);
  return (
    <MassengerLayout>
      {loaded ? (
        <ChatCardList
          chatItems={
            chattype === 'pv' ?_chats as {
              from: string;
              image: string;
              lastMessage: string;
              time: string;
            }[] : _gp as {
              from: string;
              image: string;
              lastMessage: string;
              time: string;
            }[]
          }
          link={chattype as string}
        />
      ) : (
        <LoadingInPage />
      )}
      {!openedChat && <div className='container mx-auto p-4 h-full'></div>}
      {openedChat && chattype === 'pv' && <div className='container mx-auto p-4 h-full'><ChatPagePV userImage='' userName='alireza'>
        <UserMessage text="salam"></UserMessage>
        <OtherUserMessage text='khobi'></OtherUserMessage>
        <UserMessage text="are to khobi"></UserMessage>
        <OtherUserMessage text='are manam khobam'></OtherUserMessage>
        <UserMessage text="che khabar?"></UserMessage>
        <OtherUserMessage text='salamati to cho?'></OtherUserMessage>
        <UserMessage text="hichi"></UserMessage>
        <OtherUserMessage text='ok'></OtherUserMessage>
        <UserMessage text="bye"></UserMessage>
        <OtherUserMessage text='bye'></OtherUserMessage>

        
        </ChatPagePV></div>}
        {openedChat && chattype === 'group' && <div className='container mx-auto p-4 h-full'><ChatPageGroup gpImage='' gpName='Group'>
        <UserMessage text="hi"></UserMessage>
        <OtherUserMessageInGroup text='hello' username='alireza' avatarSrc=''></OtherUserMessageInGroup>

        
        </ChatPageGroup></div>}
    </MassengerLayout>
  );
};

export default Massenger;
