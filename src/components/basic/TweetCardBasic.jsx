
import React from "react";
import UserAvatar from "./UserAvatar";
import TweetUserName3 from "./TweetUserName3";
import TweetIconCount from "./TweetIconCount";
import { useNavigate } from "react-router-dom";


const TweetCardBasic = ({ ...props }) => {
  const navigate = useNavigate();
  const tweetId = props.id
  const handleClick = (tweetId)=>{
    tweetId && navigate(`/main/tweet/${tweetId}`);
  }

  return (
    <div className='tweet-card-basic' onClick={(e)=>{
      handleClick(tweetId)
      e.stopPropagation()
      }}>
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
          <p className='tweet-card-basic-description'>
            {props.description}
          </p>
          <TweetIconCount 
            likesCount={props.likesCount} 
            repliesCount={props.repliesCount}
            isLike={props.isLike}
            id={tweetId}
            onToggleLike={({id,isLike})=>{
        props.onToggleLike?.({id,isLike})
      }}
          />
      </div>
    </div>
  );
};

export default TweetCardBasic;
