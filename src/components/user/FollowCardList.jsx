import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopUsers } from '../../api/twitter';
import FollowCard from '../basic/FollowCard';
import { useAuth } from '../context/AuthContext';
// import { useAuth } from '../context/AuthContext';
// import iconLogo from '../assets/images/icon/logo.svg';
// import svg
// import iconHome from '../assets/images/icon/home.svg';

const FollowCardList = ({ setPathId,}) => {
  const [users, setUsers] = useState([]);
  const { member, userIsFollowing } = useAuth();
  const navigate = useNavigate();

  const handleClickCard = ({ userId }) => {
    userId === member.id
      ? navigate(`/user/${userId}`)
      : userId !== undefined && navigate(`/other/${userId}`);
    setPathId(userId);
  };

  useEffect(() => {
    const getUsersAsync = async () => {
      try {
        const data = await getTopUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersAsync();
  }, [userIsFollowing]);

  return (
    <>
      <div className="follow-list-container">
        <div className="title-secondary">
          <h4>推薦跟隨</h4>
        </div>
        {users.map((user) => {
          return (
            <FollowCard key={user.id} {...user} onClick={handleClickCard} />
          );
        })}
      </div>
    </>
  );
};

export default FollowCardList;
