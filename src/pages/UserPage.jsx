import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import { HeaderUser } from '../components/basic/Header';
import { TabThreeGroup } from '../components/basic/Tab';

import FollowCardList from '../components/user/FollowCardList';
import ReplyLists from '../components/user/ReplyLists';
import TweetsLists from '../components/user/TweetsLists';
import LikeLists from '../components/user/LikeLists';
import ProfileCard from '../components/basic/ProfileCard';
import { useParams } from 'react-router-dom';
//call api
import { getUserInfo } from '../api/userinfo';
import { useAuth } from '../components/context/AuthContext';
import { getUserTweets } from '../api/twitter';
import ModalReply from '../components/basic/ModalReply';
import ModalTweet from '../components/basic/ModalTweet';
import Modal from '../components/basic/Modal';

const UserPage = () => {
  const [tabIndex, setTabIndex] = useState('0');
  const [pathId, setPathId] = useState(Number(useParams().id)); //只是為了與UserOtherPage一樣而設定state

  //取得網址:id
  //向後端 給予(pathid)參數 拿該用戶的資料
  //分別建立一個state儲存tweets like replies資料 若state有資料便不抓取新資料 除非重整頁面
  const navigate = useNavigate();
  const {
    isAuthentic,
    // currentMember,
    member,
    modalReplyOpen,
    modalTweetOpen,
    like,
    handleChangeLikeMode,
    modalProOpen,
    userIsFollowing,
  } = useAuth();
  // @串接 server 用這一個
  const [userInfo, setUserInfo] = useState({ userAccountName: '' });
  const [userTweets, setUserTweets] = useState([]);
  // const [refreshPage, setRefreshPage] = useState(false);
  //分別建立一個state儲存tweets like replies資料 若state有資料便不抓取新資料 除非重整頁面
  // @ tweets 的 dummy資料

  //@ profileCard 渲染後端 userInfo
  useEffect(() => {
    const getUserInfoAsync = async () => {
      try {
        const userInfo = await getUserInfo(pathId);
        setUserInfo(userInfo);
      } catch (error) {
        console.error('[getUser Info  with Async failed]', error);
      }
    };
    getUserInfoAsync();

    const getUserTweetsAsync = async () => {
      try {
        const data = await getUserTweets(pathId);
        setUserTweets(data);
        // console.log(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTweetsAsync();
    getUserInfoAsync();
  }, [pathId, like, modalTweetOpen, modalProOpen, userIsFollowing]);

  useEffect(() => {
    if (!isAuthentic) {
      navigate('/login');
    }
  }, [navigate, isAuthentic, member]); //只要isAuthentic或navigation有變化便執行

  //切換下方tab
  //swtich case 與 if else概念相同，但return component更簡潔(??)
  function switchContext(tabIndex) {
    switch (tabIndex) {
      case '1':
        return <ReplyLists pathId={pathId} />;
      case '2':
        return <LikeLists pathId={pathId} />;
      default:
        return (
          <TweetsLists
            tweets={userTweets}
            onToggleLike={handleChangeLikeMode}
          />
        );
    }
  }

  return (
    <>
      <ContainerColSec role='user' pageIndex={1} memberId={member.id}>
        {modalTweetOpen && <ModalTweet />}
        {modalProOpen && <Modal />}
        <section className='section-outer-m col-7'>
          <div className='section-main-m'>
            <HeaderUser
              userAccountName={userInfo.name}
              userTweetsLength={userTweets.length}
            />

            <ProfileCard
              {...userInfo}
              // setModalProOpen={setModalProOpen}
            />

            <TabThreeGroup tabIndex={tabIndex} setTabIndex={setTabIndex} />
            {modalReplyOpen && <ModalReply />}
            {switchContext(tabIndex)}
            {/* {tabIndex === '0' && <TweetsLists />}
            {tabIndex === '1' && <ReplyLists />}
            {tabIndex === '2' && <LikeLists />} */}
          </div>
        </section>
        <section className='section-right col-3'>
          <FollowCardList setPathId={setPathId} />
        </section>
      </ContainerColSec>
    </>
  );
};

export default UserPage;
