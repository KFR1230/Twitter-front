import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import { HeaderUser } from '../components/basic/Header';
import { TabTwoGroup } from '../components/basic/Tab';
import ModalTweet from '../components/basic/ModalTweet';
//call api
import { getUserInfo } from '../api/userinfo';
import { useAuth } from '../components/context/AuthContext';
// import FollowShipCard from '../components/basic/FollowShipCard';
import FollowerShipLists from '../components/user/FollowerShipLists';
import FollowCardList from '../components/user/FollowCardList';
// import { getUserTweets } from '../api/twitter';

const OthersFollowersPage = ({ setModalProOpen, setModalTweetOpen }) => {
  const [tabIndex, setTabIndex] = useState('0');
  // const pathId = Number(useParams()); //取得網址
  //向後端 給予(pathid)參數 拿該用戶的資料
  //分別建立一個state儲存tweets like replies資料 若state有資料便不抓取新資料 除非重整頁面
  const navigate = useNavigate();
  const { isAuthentic, member, modalTweetOpen } = useAuth();
  // @串接 local-server 用這一個
  const [userInfo, setUserInfo] = useState({});
  const [userIsFollowing, setUserIsFollowing] = useState(0);
  const [pathId, setPathId] = useState(Number(useParams().id));
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
  }, []);

  useEffect(() => {
    if (!isAuthentic) {
      navigate('/login');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  //切換下方tab
  //swtich case 與 if else概念相同，但return component更簡潔(??)
  function switchContext(tabIndex) {
    switch (tabIndex) {
      case '1':
        return (
          <FollowerShipLists
            tabIndex={tabIndex}
            setUserIsFollowing={setUserIsFollowing}
            userIsFollowing={userIsFollowing}
            pathId={pathId}
          />
        );
      default:
        return (
          <FollowerShipLists
            tabIndex={tabIndex}
            setFollowingFlag={setUserIsFollowing}
            userIsFollowing={userIsFollowing}
            pathId={pathId}
          />
        );
    }
  }

  return (
    <>
      <ContainerColSec
        role='user'
        setModalProOpen={setModalProOpen}
        pageIndex={1}
        memberId={userInfo.id}
      >
        {modalTweetOpen && <ModalTweet />}

        <section className='section-outer-m col-7'>
          <div className='section-main-m'>
            <HeaderUser userAccountName={userInfo.name} />

            <TabTwoGroup tabIndex={tabIndex} setTabIndex={setTabIndex} />

            {switchContext(tabIndex)}
          </div>
        </section>
        <section className='section-right col-3'>
          <FollowCardList
            setPathId={() => {}}
            userIsFollowing={userIsFollowing}
          />
        </section>
      </ContainerColSec>
    </>
  );
};

export default OthersFollowersPage;
