import React from 'react';

// import svg
// import iconBack from '../../assets/images/icon/back.svg';

// tab styles

const TabThreeGroup = ({ tabIndex, setTabIndex }) => {
  return (
    <div className='tab-group'>
      <div
        className={['tab', tabIndex === '0' ? 'active' : ''].join(' ')}
        onClick={() => setTabIndex('0')}
      >
        推文
      </div>
      <div
        className={['tab', tabIndex === '1' ? 'active' : ''].join(' ')}
        onClick={() => setTabIndex('1')}
      >
        回覆
      </div>
      <div
        className={['tab', tabIndex === '2' ? 'active' : ''].join(' ')}
        onClick={() => setTabIndex('2')}
      >
        喜歡的內容
      </div>
    </div>
  );
};

const TabTwoGroup = ({ tabIndex, setTabIndex, pathName }) => {
  // if (pathName === 'followings') {
  //   setTabIndex('1');
  // }

  return (
    <div className='tab-group'>
      <div
        className={['tab', tabIndex === '0' ? 'active' : ''].join(' ')}
        tabIndex='0'
        onClick={() => setTabIndex('0')}
      >
        追蹤者
      </div>
      <div
        className={['tab', tabIndex === '1' ? 'active' : ''].join(' ')}
        tabIndex='1'
        onClick={() => setTabIndex('1')}
      >
        正在跟隨
      </div>
    </div>
  );
};

export { TabThreeGroup, TabTwoGroup };
