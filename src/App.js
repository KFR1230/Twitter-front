import React from 'react';
// import { useState } from 'react';
import {
  // BrowserRouter as Router,
  // Link,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

//import css
import './scss/main.scss';

// import component
import PageLayout from './components/layout/PageLayout';

// import HomePage from './pages/HomePage';
import NestedUserPage from './pages/main/NestedUserPage';
import LoginPage from './pages/LoginPage';
import StoryBookPage from './pages/storybooks/StoryBookPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import SettingPage from './pages/SettingPage';
import UserPage from './pages/UserPage';
import UserOtherPage from './pages/UserOtherPage';
import UserFollowersPage from './pages/UserFollowersPage';
import OtherFollowersPage from './pages/OtherFollowersPage';
import MainPage from './pages/MainPage';
import AdminUsers from './pages/AdminUsers';
// import Modal from './components/basic/Modal';
// import ModalTweet from './components/basic/ModalTweet';
// import ModalReply from './components/basic/ModalReply';
import TweetPage from './pages/TweetPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './components/context/AuthContext';


function App() {
  // const [modalProOpen, setModalProOpen] = useState(false);
  // const [modalTweetOpen, setModalTweetOpen] = useState(false);

  const basename= process.env.PUBLIC_URL

  return (
    <>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <PageLayout>
            <Routes>
              <Route path="*" element={<LoginPage />}></Route>
              <Route path="/storybook" element={<StoryBookPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/login/admin" element={<AdminLoginPage />}></Route>
              <Route path="/admin" element={<AdminPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/main" element={<MainPage />}></Route>
              <Route
                path="/user/:id"
                element={
                  <UserPage
                  // setModalProOpen={setModalProOpen}n
                  />
                }
              ></Route>
              <Route
                path="/other/:id"
                element={
                  <UserOtherPage
                  // setModalProOpen={setModalProOpen}
                  />
                }
              ></Route>

              <Route
                path="/user/followers/:id"
                element={
                  <UserFollowersPage
                  // setModalProOpen={setModalProOpen}
                  />
                }
              ></Route>
              <Route
                path="/other/followers/:id"
                element={<OtherFollowersPage />}
              ></Route>
              <Route path="/main/tweet/:id" element={<TweetPage />}></Route>
              <Route path="/setting" element={<SettingPage />}></Route>
              <Route path="/admin/users" element={<AdminUsers />}></Route>
              <Route path="/main/self2" element={<NestedUserPage />}></Route>
            </Routes>
          </PageLayout>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
