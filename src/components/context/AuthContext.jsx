import { login, signUp, adminLogin } from '../../api/auth';
import { useState, useEffect, useContext, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import * as jwt from 'jsonwebtoken';

// import { set } from 'react-hook-form';
import { likeTweet, unlikeTweet } from '../../api/twitter';

const defaultAuthContext = {
  isAuthentic: false,
  currentMember: null,
  login: null,
  logout: null,
  signUp: null, // 註冊方法
  adminLogin: null, // 後台登入方法
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthentic, setIsAuthentic] = useState(null);
  const [payload, setPayload] = useState(null);
  //頁面刷新時，確認是誰
  const { pathname } = useLocation();
  const [modalReplyOpen, setModalReplyOpen] = useState(false);
  const [modalProOpen, setModalProOpen] = useState(false);
  const [modalTweetOpen, setModalTweetOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);
  const [member, setMember] = useState({});
  const [like, setLike] = useState(true);
  const [userIsFollowing, setUserIsFollowing] = useState(true); //控制追隨按鈕切換變化

  const handleChangeLikeMode = async ({ id, isLike, UserId, tabIndex }) => {
    if (pathname.includes('other') && tabIndex === 2) {
      // console.log(tabIndex);
      return; //使用者無法更改其他使用者喜歡的內容
    }

    if (!isLike) {
      await likeTweet(id);
    } else {
      await unlikeTweet(id);
    }
    setLike(!like);
  };

  // 封裝檢查token
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthentic(false);
        setPayload(null);
        return;
      }
      // @ checkPermission 功能
      // const result = await checkPermission(authToken);
      // if (result) {
      //   setisAuthentic(true);
      //   const tempPayload = jwt.decode(authToken);
      //   setPayload(tempPayload);
      // } else {
      //   setisAuthentic(false);
      //   setPayload(null);
      // }

      //@ 沒有checkPermission的替代過度版 可以暫時只有檢視是否有token+token解析
      if (authToken) {
        setIsAuthentic(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
        setMember(tempPayload);
        return;
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthentic,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          avatar: payload.avatar,
        },
        setModalReplyOpen,
        modalReplyOpen,
        setModalTweetOpen,
        modalTweetOpen,
        setModalProOpen,
        modalProOpen,
        setTweetId,
        tweetId,
        member,
        like,
        handleChangeLikeMode,
        setUserIsFollowing,
        userIsFollowing,
        //共用的register流程
        signUp: async (user) => {
          const { success, errorMessage } = await signUp({
            account: user.account,
            password: user.password,
            email: user.email,
            checkPassword: user.checkPassword,
            name: user.name,
          });

          if (success) {
            // 解析payload
            // eva新增----
            // const token = data.token;
            // const tempPayload = jwt.decode(token);
            // ------------
            // const tempPayload = jwt.decode(authToken);
            // if (success) {
            //   setIsAuthentic(true);
            //   // localStorage.setItem('authToken', token);
            //   // localStorage.setItem('authToken', authToken);
            //   setPayload(success);
            //   setMember(tempPayload);
            //   console.log('we have tempPayload', tempPayload);
            // } else {
            //   setPayload(null);
            //   setIsAuthentic(false);
            //   console.log('no tempPayload', tempPayload);
            // }
            return { success };
          } else {
            return { success, errorMessage };
          }
        },
        login: async (user) => {
          const { success, data, errorMessage } = await login({
            account: user.account,
            password: user.password,
          });
          if (success) {
            const token = data.token;
            const tempPayload = jwt.decode(token);
            // console.log('data',data)
            // console.log('tempPayload: ', tempPayload )
            //{id: 14, account: 'user1', email: 'user1@example.com', name: 'user1 name', avatar: null, …}

            if (tempPayload) {
              setIsAuthentic(true);
              localStorage.setItem('authToken', token);
              setPayload(tempPayload);
              //等有test-token CheckPermission 完後才導入使用者資訊
              setMember(tempPayload);
            } else {
              setIsAuthentic(false);
            }
            return { success };
          } else {
            return { success, errorMessage };
          }
        },
        logout: async () => {
          localStorage.removeItem('authToken');
          setIsAuthentic(false);
          setPayload(null);
        },
        adminLogin: async (user) => {
          const { success, data, errorMessage } = await adminLogin({
            account: user.account,
            password: user.password,
          });
          if (success) {
            const token = data.token;
            const tempPayload = jwt.decode(token);
            // console.log('data',data)
            // console.log('tempPayload: ', tempPayload )
            //{id: 14, account: 'user1', email: 'user1@example.com', name: 'user1 name', avatar: null, …}

            if (tempPayload) {
              setIsAuthentic(true);
              localStorage.setItem('authToken', token);
              setPayload(tempPayload);
              //等有test-token CheckPermission 完後才導入使用者資訊
              setMember(tempPayload);
            } else {
              setIsAuthentic(false);
            }
            return { success };
          } else {
            return { success, errorMessage };
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
