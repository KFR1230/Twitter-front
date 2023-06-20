const ModalContent = ({ children }) => {
  return (
    <>
      <div className='modal-outer-container modal-transparent-bk'>
        <div className='modal-flex-box'>
          <div className='modal-container'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalContent;
