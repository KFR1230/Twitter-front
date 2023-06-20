import React from 'react';
import TweetUserName3 from './TweetUserName3';
import UserAvatar from './UserAvatar';
const TweetRepliesCard = ({ ...props }) => {
  return (
    <div className='tweet-card-basic'>
      <UserAvatar 
      avatar={props.User.avatar}
      userId={props.UserId} 
      onClick={({userId})=>{
        props.onClick?.({userId})
      }}
      />
      <div className='tweet-card-left-info'>
        <TweetUserName3
          name={props.User.name}
          account={props.User.account}
          time={props.createdAt}
        />
        <p className='tweet-card-basic-reply'>
          回覆
          <span className='reply-user-account'>@{props.account}</span>
        </p>
        <p className='tweet-card-basic-description'>{props.comment}</p>
      </div>
    </div>
  );
};

export default TweetRepliesCard;
