import React from 'react';
import { Link, useParams } from 'react-router-dom';

import UserAvatar from './UserAvatar';
import UserBk from './UserBk';

// import svg
// @ testing local photo
// import testAvatar from '../../assets/images/avatar1.jpg';
import iconMessage from '../../assets/images/icon/message.svg';
import iconNotice from '../../assets/images/icon/notice.svg';
import clsx from 'clsx';
//@ testing http photos
// const testBk =
//   'https://images.unsplash.com/photo-1497290756760-23ac55edf36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80';

const ProfileOtherCard = ({
  name,
  account,
  introduction,
  avatar,
  banner,
  followersCount,
  followingsCount,
  setModalProOpen,
  onClick,
  isFollowing,
}) => {
  const userId = Number(useParams().id);
  return (
    <>
      <div className='profile-card'>
        <UserBk bkUrl={banner} />
        <UserAvatar avatar={avatar} />
        <div className='profile-btn-group'>
          <img
            src={iconMessage}
            alt='icon of message'
            className='icon-round icon-message icon-round cursor-point'
          />
          <img
            src={iconNotice}
            alt='icon of Notice'
            className='icon-round icon-notice icon-round cursor-point'
          />
          <button
            className={`${clsx('', {
              active: isFollowing,
            })} button-md button-m`}
            onClick={() => onClick?.(userId, isFollowing)}
          >
            {isFollowing ? '正在跟隨' : '跟隨'}
          </button>
        </div>
        <div className='profile-info'>
          <h5 className='user-name'>{name}</h5>
          <p className='user-account'>@{account}</p>
          <p className='user-desc'>{introduction}</p>
        </div>
        <div className='user-follow-info'>
          <Link to={`/other/followers/${userId}`} state={{ tabIndex: '1' }}>
            <p>
              {followingsCount} 個 <span>跟隨中</span>
            </p>
          </Link>

          <Link to={`/other/followers/${userId}`} state={{ tabIndex: '0' }}>
            <p>
              {followersCount} 位<span>跟隨者</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileOtherCard;
