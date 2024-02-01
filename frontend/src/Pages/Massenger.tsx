import React from 'react';
import ChatCardList from '../Components/Chat/ChatList';
import MassengerLayout from '../Layouts/Massenger';
import { useAPI } from '../Actions/API/useAPI';
import LoadingInPage from '../Components/Loading/LoadingInPage';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatPageGroup, ChatPagePV } from '../Components/Chat/ChatPage';
import { OtherUserMessage, OtherUserMessageInGroup, UserMessage } from '../Components/Message/Message';

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
        console.log(res.data);
        setChats(res.data)
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
            chats as {
              from: string;
              image: string;
              lastMessage: string;
              time: string;
            }[]
          }
        />
      ) : (
        <LoadingInPage />
      )}
      {!openedChat && <div className='container mx-auto p-4 h-full'></div>}
      {openedChat && chattype === 'pv' && <div className='container mx-auto p-4 h-full'><ChatPagePV userImage='' userName='alireza'>
        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>

        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        <OtherUserMessage text='hello'></OtherUserMessage>
        
        </ChatPagePV></div>}
        {openedChat && chattype === 'group' && <div className='container mx-auto p-4 h-full'><ChatPageGroup gpImage='' gpName='Group'>
        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>

        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>
        <OtherUserMessageInGroup text='hello' username='alireza' avatarSrc=''></OtherUserMessageInGroup>
        <UserMessage text="hi"></UserMessage>
        <UserMessage text="hi"></UserMessage>
        <OtherUserMessageInGroup text='hello' username='alireza' avatarSrc=''></OtherUserMessageInGroup>
        <OtherUserMessageInGroup text='hello' username='alireza' avatarSrc=''></OtherUserMessageInGroup>
        <OtherUserMessageInGroup text='hello' username='alireza' avatarSrc=''></OtherUserMessageInGroup>
        <OtherUserMessageInGroup text='hello' username='alireza' avatarSrc=''></OtherUserMessageInGroup>

        
        </ChatPageGroup></div>}
    </MassengerLayout>
  );
};

export default Massenger;
