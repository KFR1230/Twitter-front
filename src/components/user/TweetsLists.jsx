import React from 'react';
import TweetCardBasic from '../basic/TweetCardBasic';
// import { useEffect } from 'react';

const TweetsLists = ({ tweets, onClick, onToggleLike }) => {
  return (
    <div className='TweetLists'>
      {tweets.map((tweet) => {
        return (
          <TweetCardBasic
            key={tweet.id}
            {...tweet}
            onClick={({ tweetId, userId }) => {
              onClick?.({ tweetId, userId });
            }}
            onToggleLike={({ id, isLike }) => {
              onToggleLike?.({ id, isLike });
            }}
          />
        );
      })}
    </div>
  );
};

export default TweetsLists;
