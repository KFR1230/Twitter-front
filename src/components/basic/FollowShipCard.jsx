import React from 'react';
import UserAvatar from './UserAvatar';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FollowShipCard = ({ ...props }) => {
  const navigate = useNavigate();
  const { member } = useAuth();

  const handleClickCard = ({ userId }) => {
    userId === member.id
      ? navigate(`/user/${userId}`)
      : userId !== undefined && navigate(`/other/${userId}`);
    // setPathId(userId);
  };

  return (
    <div className='follow-ship-card'>
      <div className='tweet-card-basic'>
        <UserAvatar
          avatar={props.avatar}
          userId={props.id}
          onClick={handleClickCard}
        />
        <div className='tweet-card-left-info'>
          <div className='tweet-username-2'>
            <span className='user-name'>{props.name}</span>
            <span
              className='follow-card-button'
              onClick={(e) => {
                props.onClick?.({
                  userId: props.id,
                  isfollowing: props.isfollowing,
                });
                e.stopPropagation();
              }}
            >
              { member.id === props.id ? <></> : <button
                className={`${clsx('', {
                  active: props.isfollowing,
                })} button-md button-m`}
                type='submit'
              >
                {props.isfollowing ? '正在跟隨' : '跟隨'}
              </button> }
            </span>
          </div>
          <p className='tweet-card-basic-description'>{props.introduction}</p>
        </div>
      </div>
    </div>
  );
};

export default FollowShipCard;
