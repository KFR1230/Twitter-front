import React from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import svg
import iconBack from '../../assets/images/icon/back.svg';

const HeaderMain = ({ pageTitle }) => {
  return (
    <div className='header-container header-main'>
      <h5>{pageTitle}</h5>
    </div>
  );
};

const HeaderUser = ({ userAccountName, userTweetsLength }) => {
  const navigate = useNavigate();

  return (
    <div className='header-container'>
      {/* <Link to='/main'> */}
      <img
        src={iconBack}
        alt='Back to pre page'
        className='icon-back cursor-point'
        onClick={() => {
          //@ 回上頁
          navigate(-1);
        }}
      />
      {/* </Link> */}

      <div className='header-user-info'>
        <h5>{userAccountName}</h5>
        <p>{userTweetsLength} 推文</p>
      </div>
    </div>
  );
};

export { HeaderMain, HeaderUser };
