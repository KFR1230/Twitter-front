import React from 'react';
import UserAvatar from './UserAvatar';
import TweetUserName3 from './TweetUserName3';

import iconClose from '../../assets/images/icon/close.svg';
// import DayTime from '../../helper/TimeHelper';

const TweetCardAdmin = ({
  id,
  description,
  UserId,
  User,
  createdAt,
  // onHandleClick,
  onDelete,
  tweetId,
  setTweetId,
}) => {
  const truncate = (str, maxlenth) => {
    return str.length > maxlenth ? str.slice(0, maxlenth - 1) + '...' : str;
  };
  return (
    <div className='tweet-card-basic tweet-card-admin'>
      <UserAvatar avatar={User.avatar} userId={UserId} />
      <div className='tweet-card-left-info'>
        <div className='icon-inner-wrap'>
          <TweetUserName3
            name={User.name}
            account={User.account}
            time={createdAt}
          />

          <img
            className='icon-delete'
            src={iconClose}
            alt='cross icon'
            onClick={() => {
              onDelete?.(id);
              // console.log(id);
            }}
          />
        </div>

        <div className='description-wrap'>
          <p className='tweet-card-basic-description'>
            {truncate(description, 51)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TweetCardAdmin;
