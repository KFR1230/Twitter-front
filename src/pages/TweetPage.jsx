import React from 'react';
import ContainerColSec from '../components/layout/ContainerColSec';
import { HeaderUser } from '../components/basic/Header';
import TweetBigCard from '../components/basic/TweetBigCard';
import { useEffect, useState } from 'react';
import { getTweet, getTweetReplies, likeTweet, unlikeTweet } from '../api/twitter';
import TweetRepliesList from '../components/user/TweetRepliesList';
import { useAuth } from '../components/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import ModalReply from '../components/basic/ModalReply';
import ModalTweet from '../components/basic/ModalTweet';
import FollowCardList from '../components/user/FollowCardList';

const TweetPage = ({ setModalTweetOpen }) => {
  const [tweetInfo, setTweetInfo] = useState({
    id: '',
    UserId: '',
    description: '',
    createdAt: '',
    User: {},
  });
  const [tweetReplies, setTweetReplies] = useState([]);
  //這裡很奇怪只有他 要先設定一樣的結構

  const { isAuthentic, member,modalReplyOpen,setTweetId,handleChangeLikeMode,like, modalTweetOpen} = useAuth();

  const pathId = Number(useParams().id);
  const navigate = useNavigate();
  const handleClickCard = ({ userId }) => {
    userId === member.id
      ? navigate(`/user/${userId}`)
      : userId !== undefined && navigate(`/other/${userId}`);
  };


  useEffect(() => {
    const getTweetAsync = async () => {
      try {
        const data = await getTweet(pathId);
        setTweetInfo(data);
        setTweetId(pathId);
      } catch (error) {
        console.log(error);
      }
    };
    getTweetAsync();
  }, [pathId,like, modalTweetOpen]);


  useEffect(() => {
    const getTweetRepliesAsync = async () => {
      try {
        const data = await getTweetReplies(pathId);
        setTweetReplies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTweetRepliesAsync();
  }, [modalReplyOpen]);

  return (
    <ContainerColSec
      role="user"
      setModalTweetOpen={setModalTweetOpen}
      pageIndex={0}
      memberId={member?.id}
    >
      {modalTweetOpen && <ModalTweet />}
      {modalReplyOpen && <ModalReply />}
      <section className="section-outer-m col-7">
        <div className="section-main-m">
          <HeaderUser userAccountName="推文" />
          <div className="TweetPage">
            <TweetBigCard
              tweetInfo={tweetInfo}
              onClick={handleClickCard}
              onToggleLike={handleChangeLikeMode}
            />
            <TweetRepliesList
              tweetReplies={tweetReplies}
              account={tweetInfo.User.account}
              onClick={handleClickCard}
            />
          </div>
        </div>
      </section>
      <section className="section-right col-3">
        <FollowCardList setPathId={() => {}} />
      </section>
    </ContainerColSec>
  );
};

export default TweetPage;
