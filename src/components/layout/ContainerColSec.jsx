import React from 'react';
import SecLeftNav from '../basic/SecLeftNev';
// import { useAuth } from '../../components/context/AuthContext';

const ContainerColSec = ({
  children,
  role,
  // setModalTweetOpen,
  pageIndex,
  memberId,
}) => {
  // const { modalTweetOpen, setModalTweetOpen } = useAuth(); // 取出需要的狀態與方法

  return (
    <>
      {/* bootstrap gutter system needs come after row => row gx-4 */}
      <main className='container_sec'>
        {/* <main className='container_sec grid'> */}
        <SecLeftNav
          role={role}
          // setModalTweetOpen={setModalTweetOpen}
          pageIndex={pageIndex}
          memberId={memberId}
        />
        {children}
      </main>
      {/* <Modal /> */}
    </>
  );
};

export default ContainerColSec;
