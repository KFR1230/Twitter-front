import React from 'react';
import UserAvatar from './UserAvatar';
import TweetUserName2 from './TweetUserName2';
import clsx from 'clsx';
import { cancelFollow, userFollowing } from '../../api/twitter';
import { useAuth } from '../context/AuthContext';

const FollowCard = ({ ...props }) => {
  const id = props.id;
  const { setUserIsFollowing } = useAuth();
  const handleUserIsFollowing = async ({ userId, isfollowing }) => {
    try {
      if (!isfollowing) {
        await userFollowing(userId);
      } else {
        await cancelFollow(userId);
      }
    } catch (error) {
      console.log(error);
    }
    setUserIsFollowing((prev) => !prev);
  };

  return (
    <div className='follow-card'>
      <div className='follow-card-info'>
        <UserAvatar
          avatar={props.avatar}
          userId={id}
          onClick={({ userId }) => {
            props.onClick?.({ userId });
          }}
        />
        <TweetUserName2 name={props.name} account={props.account} />
      </div>
      <div className='follow-card-button'>
        <button
          className={`${clsx('', {
            active: props.isFollowing,
          })} button-md button-m`}
          type='submit'
          onClick={(e) => {
            handleUserIsFollowing({
              userId: props.id,
              isfollowing: props.isFollowing,
            });
            e.stopPropagation();
          }}
        >
          {props.isFollowing ? '正在跟隨' : '跟隨'}
        </button>
      </div>
    </div>
  );
};

export default FollowCard;
