import React from 'react';
// import custom components
import { Link } from 'react-router-dom';
import { TabThreeGroup, TabTwoGroup } from '../../components/basic/Tab';

//import css
import '../../scss/storybooks/storyBookPage.scss';

const LayoutNav = () => {
  return (
    <>
      <div className='storybook-layout'>
        <div className='storybook-container'>
          <h2>Storybooks</h2>
          <h4 className='page-sec-title'>
            === Buttons-元件本身目前沒有製作上下margin，是本表顯示用 ===
          </h4>

          <div className='flex_col_cc comp-container'>
            <button className='button-filled button-lg' type='submit'>
              登入
            </button>
            <button className='button-sm button-m active' type='submit'>
              推文
            </button>
            <button className='button-bg button-m active' type='submit'>
              儲存
            </button>
            <button className='button-md button-m active' type='submit'>
              正在追蹤
            </button>
            <button className='button-md button-m' type='submit'>
              編輯個人資料
            </button>
            <Link className='button-link' type='submit'>
              取消
            </Link>
          </div>

          <h4 className='page-sec-title'>
            === tabs -元件本身綁定切換內容，這頁的tab 點了會壞不要管他lol ===
          </h4>
          <TabThreeGroup />
          <TabTwoGroup />
        </div>
      </div>
    </>
  );
};

export default LayoutNav;
