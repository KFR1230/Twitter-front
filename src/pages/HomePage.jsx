import React from 'react';

// import custom components
import ContainerColOne from '../components/layout/ContainerColOne';

// import svg
import iconNotice from '../assets/images/icon/notice.svg';
import iconNoticeActive from '../assets/images/icon/notice-filled.svg';

const HomePage = () => {
  return (
    <>
      {/* 一欄式頁面 */}
      <ContainerColOne>
        <div>
          <img
            src={iconNotice}
            alt='icon of Notice'
            className='icon-notice cursor-point'
          />
        </div>
        <div>
          <img
            src={iconNoticeActive}
            alt='icon of Notice'
            className='icon-notice_active cursor-point'
          />
        </div>

        <h1> test our layout</h1>
      </ContainerColOne>

      {/* 二欄式頁面 */}
      {/* <ContainerTwo> */}
      {/* 三欄式頁面 */}
      {/* <ContainerThree> */}
    </>
  );
};

export default HomePage;
