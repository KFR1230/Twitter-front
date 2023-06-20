import React from "react";
import TweetUserName3 from "./TweetUserName3";
import UserAvatar from "./UserAvatar";


const ReplyCard = ({tweetInfo})=>{
  return (
    <div className='tweet-card-basic'>
      <UserAvatar avatar={tweetInfo.User.avatar} />
      <div className='tweet-card-left-info'>
        <TweetUserName3
          name={tweetInfo.User.name}
          account={tweetInfo.User.account}
          time={tweetInfo.createdAt}
        />
        <p className='tweet-card-basic-description'>{tweetInfo.description}</p>
        <p className='tweet-card-basic-reply'>
          回覆給
          <span className='reply-user-account'>@{tweetInfo.User.account}</span>
        </p>
      </div>
    </div> 
  )
}
//回覆的帳號相同


export default ReplyCard;