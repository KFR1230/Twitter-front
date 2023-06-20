import React from 'react';
import DayTime from '../../helper/TimeHelper';
//時間會在更新
const TweetUserName3 = ({ name, account, time }) => {
  // const relativeTime = timeHelper.relativeTimeFromNow(time)
  // console.log(relativeTime)
  return (
    <div className='tweet-username-3'>
      <div>
        <span className='user-name'>{name}</span>
        <span className='user-account'>@{account}</span>
        <span className='user-time'> ·{DayTime(time)}</span>
      </div>
    </div>
  );
};

export default TweetUserName3;
