import React from 'react';
import TweetIconCount from './TweetIconCount';
import TweetUserName3 from './TweetUserName3';
import UserAvatar from './UserAvatar';

const TweetCardFollowing = ({ ...props }) => {
  return (
    <div className='tweet-card-basic'>
      <UserAvatar avatar={props.avatar} />
      <div className='tweet-card-left-info'>
        <div className='tweet-card-name-btn'>
          <TweetUserName3
            name={props.name}
            account={props.account}
            time={props.time}
          />
          <span className='tweet-card-btn'>
            <button className='button-md button-m active' type='submit'>
              正在追蹤
            </button>
          </span>
        </div>
        <p className='tweet-card-basic-description'>{props.description}</p>
        <TweetIconCount
          likeCount={props.likeCount}
          replyCount={props.repliesCount}
        />
      </div>
    </div>
  );
};

export default TweetCardFollowing;
