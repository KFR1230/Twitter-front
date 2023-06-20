import iconLogo from '../../assets/images/icon/logo.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// import svg
// import iconHome from '../assets/images/icon/home.svg';

const SecLeftNav = ({ role, pageIndex, memberId }) => {
  // className={['tab', tabIndex === '0' ? 'active' : ''].join(' ')
  const { logout, setModalTweetOpen } = useAuth();
  const handleClick = () => {
    logout();
  };
  return (
    <>
      <nav className='left-nav col-2'>
        {/* <nav className='left-nav g-col-2'> */}
        <div className='left-nav-link'>
          <div className='left-nav-link-items'>
            <Link
              to={role === 'admin' ? '/admin' : '/main'}
              className='link-logo'
            >
              <img
                src={iconLogo}
                alt='Alphitter Icon'
                className='icon-logo cursor-point'
              />
            </Link>

            <Link
              to={role === 'admin' ? '/admin' : '/main'}
              className='nav-link '
            >
              <span
                className={[
                  'nav-icon icon-home',
                  pageIndex === 0 ? 'active' : '',
                ].join(' ')}
              ></span>
              <p>{role === 'admin' ? '推文清單' : '首頁'}</p>
            </Link>

            <Link to={role === 'admin' ? '/admin/users' : `/user/${memberId}`}>
              <span
                className={[
                  'nav-icon icon-user',
                  pageIndex === 1 ? 'active' : '',
                ].join(' ')}
              ></span>
              <p>{role === 'admin' ? '使用者列表' : '個人資料'}</p>
            </Link>

            {role !== 'admin' && (
              <>
                <Link to='/setting'>
                  <span
                    className={[
                      'nav-icon icon-setting',
                      pageIndex === 2 ? 'active' : '',
                    ].join(' ')}
                  ></span>
                  <p>設定</p>
                </Link>

                <button
                  className='button-filled button-lg button-tweet'
                  type='submit'
                  onClick={() => setModalTweetOpen(true)}
                  // onClick={()=> setModalActive(!)}
                >
                  <span className='button-tweet-view'>推文</span>
                  <span className='button-tweet-view-m'></span>
                </button>
              </>
            )}
          </div>
          <div className='left-nav-link-logout'>
            <Link to='/login' onClick={handleClick}>
              <span className='nav-icon icon-logout'></span>
              <p>登出</p>
            </Link>
          </div>
          {/* //06/07 與keifer衝突區塊 */}
          {/* <div className='menu-link-logout'>
            <Link to='/login'>
              <span className='nav-icon icon-logout '></span>
              登出
            </Link>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default SecLeftNav;
