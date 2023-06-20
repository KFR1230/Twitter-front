import React, { useEffect, useState } from 'react';
import { getUserRepliedTweets } from '../../api/twitter';
import TweetCardReply from '../basic/TweetCardReply';

const ReplyLists = ({ pathId, onClick }) => {
  const [userReplied, setUserReplied] = useState([]);

  useEffect(() => {
    const getUserRepliedTweetsAsync = async () => {
      try {
        const data = await getUserRepliedTweets(pathId);
        setUserReplied(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserRepliedTweetsAsync();
  }, [pathId]);

  return (
    <div className='TweetLists'>
      {userReplied.map((tweet) => {
        return (
          <TweetCardReply
            key={tweet.id}
            {...tweet}
            // onClick={({id,userId})=>{
            //   onClick?.({id,userId})
            // }}
          />
        );
      })}
    </div>
  );
};

export default ReplyLists;
