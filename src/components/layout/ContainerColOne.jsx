import React from 'react';

const ContainerColOne = ({ children }) => {
  return (
    <>
      {/* <div className='row'> */}
      <main className='container_one col-12'>{children}</main>
      {/* </div> */}
    </>
  );
};

export default ContainerColOne;
