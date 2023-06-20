import React from 'react';

// import svg
import iconClose from '../../assets/images/icon/close.svg';

const ModalHeader = ({ setModalTweetOpen, setModalReplyOpen }) => {
  return (
    <>
      <div className='modal-header'>
        <img
          src={iconClose}
          alt='icon of close button'
          className='icon-close'
          onClick={() => {
            setModalTweetOpen?.(false);
            setModalReplyOpen?.(false);
          }}
        />
      </div>
    </>
  );
};
const ModalHeaderIcon = ({ setModalProOpen, onSubmit }) => {
  return (
    <>
      <div className='modal-header modal-header-with-btn'>
        <img
          src={iconClose}
          alt='icon of close button'
          className='icon-close'
          onClick={() => setModalProOpen(false)}
        />
        <h5>編輯個人資料</h5>
        <button
          className='button-md button-m active'
          form='hook-form'
          type='submit'

          // onClick={onSubmit}
          //  type='submit'
        >
          儲存
        </button>
      </div>
    </>
  );
};
export { ModalHeader, ModalHeaderIcon };
