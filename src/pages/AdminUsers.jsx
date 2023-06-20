import React from 'react';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import { HeaderMain } from '../components/basic/Header';
import ProfileMiniCard from '../components/basic/ProfileMiniCard';
//import api
import { getAllUsers } from '../api/admin';

const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  // const navigate = useNavigate();

  // const handleClickCard = (id) => {
  //   // alert('點擊');
  //   // console.log(id);
  //   if (id) {
  //     navigate(`/user/${id}`); //@還沒搭配身份驗證會先跳出跑到login
  //   }
  // };

  //前面刷新資料
  useEffect(() => {
    const getAllUserAsync = async () => {
      try {
        const allUsers = await getAllUsers();
        setAllUsers(allUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUserAsync();
  }, []);

  return (
    <>
      <ContainerColSec role='admin' pageIndex={1}>
        <div className='section-outer-l col-10'>
          <div className='section-main-l'>
            <HeaderMain pageTitle='使用者列表' />
            <div className='admin-user-wrapper'>
              {allUsers.map((allUser) => {
                return (
                  <ProfileMiniCard
                    key={allUser.id}
                    {...allUser}
                    // handleClickCard={() => {
                    //   handleClickCard?.(allUser.id);
                    // }}
                  />
                );
              })}
              {/* <ProfileMiniCard /> */}
            </div>
          </div>
        </div>
      </ContainerColSec>
    </>
  );
};

export default AdminUsers;
