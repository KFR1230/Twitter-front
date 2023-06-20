import React from 'react';
// import DefaultBk from '../../assets/images/bk.jpg';

const UserBk = ({ bkUrl }) => {
  return (
    <>
      <div className='profile-bk-clip'>
        {bkUrl && (
          <img src={bkUrl} alt='mountain pic' className='profile-bk-image' />
        )}
      </div>
    </>
  );
};

export default UserBk;
