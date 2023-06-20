import React from 'react';
import { useEffect } from 'react';
// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import SettingForm from '../components/forms/SettingForm';
import { HeaderMain } from '../components/basic/Header';
import ModalTweet from '../components/basic/ModalTweet';
import { useAuth } from '../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingPage = ({ setModalTweetOpen }) => {
  const { isAuthentic, member, modalTweetOpen } = useAuth(); // 取出需要的狀態與方法
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentic) {
      navigate('/login');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <>
      <ContainerColSec
        role='user'
        setModalTweetOpen={setModalTweetOpen}
        pageIndex={2}
        memberId={member?.id}
      >
        {modalTweetOpen && <ModalTweet />}

        <section className='section-outer-m col-7'>
          <div className='section-main-m'>
            <HeaderMain pageTitle='帳戶設定' />
            <SettingForm />
          </div>
        </section>
      </ContainerColSec>
    </>
  );
};

export default SettingPage;
