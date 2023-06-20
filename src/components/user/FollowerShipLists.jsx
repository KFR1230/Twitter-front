import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  cancelFollow,
  getUserFollower,
  getUserFollowing,
  userFollowing,
} from '../../api/twitter';
import { useState } from 'react';
import FollowShipCard from '../basic/FollowShipCard';
import { useLocation } from 'react-router-dom';

const FollowerShipLists = ({ tabIndex, pathId }) => {
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const { setUserIsFollowing, userIsFollowing } = useAuth();
  const { pathname } = useLocation();
  const handleUserIsFollowing = async ({ userId, isfollowing }) => {
    if (pathname.includes('other')) {
      return;
    }
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

  function switchContext(tabIndex) {
    switch (tabIndex) {
      case '1':
        return following.map((user) => {
          return (
            <FollowShipCard
              key={user.id}
              {...user}
              isfollowing={true}
              onClick={handleUserIsFollowing}
            />
          );
        });
      default:
        return follower.map((user) => {
          return (
            <FollowShipCard
              key={user.id}
              {...user}
              onClick={handleUserIsFollowing}
            />
          );
        });
    }
  }

  useEffect(() => {
    const getUserFollowerAsync = async () => {
      const data = await getUserFollower(pathId);
      setFollower(data);
    };
    const getUserFollowingAsync = async () => {
      const data = await getUserFollowing(pathId);
      setFollowing(data);
    };
    getUserFollowerAsync();
    getUserFollowingAsync();
  }, [userIsFollowing]);

  return (
    <>
      <div className='TweetLists'>{switchContext(tabIndex)}</div>
    </>
  );
};

export default FollowerShipLists;
