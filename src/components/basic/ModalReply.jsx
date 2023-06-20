// import { useForm } from 'react-hook-form';

// import component
import ModalContent from './ModalContent';
// import UserAvatar from './UserAvatar';
// import InputGroup from '../forms/InputGroup';
import { ModalHeader } from './ModalHeader';
import ReplyCardForm from '../forms/ReplyCardForm';
// @ testing local photo
// import testAvatar from '../../assets/images/avatar1.jpg';
import ReplyCard from './ReplyCard';
import { useEffect, useState } from 'react';
import { getTweet } from '../../api/twitter';
import { useAuth } from '../context/AuthContext';
import { getUserInfo } from '../../api/userinfo';
const ModalReply = () => {
  const [tweetInfo, setTweetInfo] = useState({
    id: '',
    UserId: '',
    description: '',
    createdAt: '',
    User: {},
    Likes: {},
    replies: {},
    updatedAt: '',
  });
  const { member, setModalReplyOpen, tweetId } = useAuth();
  const [profile, setProfile] = useState({});
  
  useEffect(() => {
    const getTweetAsync = async () => {
      try {
        const data = await getTweet(tweetId);
        setTweetInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTweetAsync();
  }, []);

  useEffect(() => {
    const getUserInfoAsync = async () => {
      try {
        const data = await getUserInfo(member.id);
        setProfile(data);
      } catch (error) {
        console.error('[getUser Info  with Async failed]', error);
      }
    };
    getUserInfoAsync();
  }, []);

  return (
    <>
      <ModalContent>
        <ModalHeader setModalReplyOpen={setModalReplyOpen} />
        <div className='modal-content modal-reply-content'>
          <div className='tweet-reply-wrapper'>
            <ReplyCard tweetInfo={tweetInfo} />
          </div>
          <div className='tweet-form-wrapper'>
            <ReplyCardForm
              avatar={profile.avatar}
              tweetInfo={tweetInfo}
            />
          </div>
        </div>
      </ModalContent>
    </>
  );
};

export default ModalReply;
