import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import { HeaderMain } from '../components/basic/Header';
// import TweetLists from '../components/user/TweetsLists';
import { useAuth } from '../components/context/AuthContext';
import { getAllTweets } from '../api/admin';
import { deleteUserTweet } from '../api/admin';
import TweetCardAdmin from '../components/basic/TweetCardAdmin';

const AdminPage = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetId, setTweetId] = useState(null);

  const navigate = useNavigate();
  const { isAuthentic } = useAuth(); // 取出需要的狀態與方法
  const [isTweetsLoaded, setIsTweetsLoaded] = useState(false); // 用來防止tweets-loop產生

  // @ 頁面首次載入 /api/admin /tweets
  const getAllTweetsAsync = async () => {
    try {
      const data = await getAllTweets();
      setTweets(data);
      return;
    } catch (error) {
      console.log(error);
      setIsTweetsLoaded(true); // 标记为已加载，以防止无限加载
    }
  };

  const handleDeleteUserTweet = async (id) => {
    let text = '是否確認要刪除？';

    if (window.confirm(text) == true) {
      // console.log('You pressed OK!');
      try {
        // console.log({ tweetId });
        // console.log(id);
        if (id) {
          await deleteUserTweet(id);
          getAllTweetsAsync();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // console.log('You pressed delete!');
      return;
    }

    // try {
    //   if (id) {
    //     await deleteUserTweet(id);
    //     getAllTweetsAsync();
    //     return;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    //@ 呼叫 /api/tweets
    getAllTweetsAsync();
  }, []);

  useEffect(() => {
    if (isAuthentic) {
      navigate('/admin');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  // console.log(tweets);

  return (
    <>
      <ContainerColSec role='admin' pageIndex={0}>
        <div className='section-outer-l col-10'>
          <div className='section-main-l'>
            <HeaderMain pageTitle='推文清單' />
            {tweets.map((tweet) => {
              return (
                <TweetCardAdmin
                  key={tweet.id}
                  {...tweet}
                  onDelete={handleDeleteUserTweet}
                  setTweetId={setTweetId}
                  tweetId={tweetId}
                />
              );
            })}
          </div>
        </div>
      </ContainerColSec>
    </>
  );
};

export default AdminPage;
