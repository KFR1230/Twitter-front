import axios from 'axios';
// const baseUrl = 'http://localhost:3004';

const baseUrl = 'https://calm-eyrie-50498.herokuapp.com/api';
// const baseUrl = 'https://agile-forest-26034.herokuapp.com/api';

const axiosInstance = axios.create({
  baseUrl: baseUrl,
});

// Add a request interceptor - 讓api把token帶入
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error(error);
  }
);

// ,  {
//   headers: {
//     'Content-Type': 'application/json',
//     'Origin': 'https://leemengyun.github.io/'
//   }}

// ,{
//       headers: {
//         'Access-Control-Allow-Origin':'*',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
//         'Accept': 'application/json',
//       }
//     }

export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`); //watch的屬性名作為path
    //console.log(res.data[0].data)//{status: 'success', data: {…}}data: {tweets: Array(7)}status: "success"[[Prototype]]: Object
    return res.data; //{tweets: Array(54)}
  } catch (error) {
    console.log('[Get Tweets failed]:', error);
  }
};

export const getTopUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/top`);
    return res.data;
  } catch (error) {
    console.log('[get topUser failed]:', error);
  }
};

export const getTweet = async (pathId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${pathId}`);
    return res.data;
  } catch (error) {
    console.log('[Get Tweet Failed]: ', error);
  }
};

//取得User的推文
export const getUserTweets = async (pathId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${pathId}/tweets`);
    return res.data;
  } catch (error) {
    console.log('[Get UserTweets Failed!!]:', error);
  }
};
//取得User Liked的推文
export const getUserLikedTweets = async (pathId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${pathId}/likes`);
    return res.data;
  } catch (error) {
    console.log('[Get getUserLikedTweets Failed!!]:', error);
  }
};

//取得User Replied的推文
export const getUserRepliedTweets = async (pathId) => {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/users/${pathId}/replied_tweets`
    );
    return res.data;
  } catch (error) {
    console.log('[Get GetUserRepliedTweets Failed!!]:', error);
  }
};

//新增 tweet
export const createTweet = async (payload) => {
  try {
    const { UserId, description } = payload;
    const res = await axiosInstance.post(`${baseUrl}/tweets`, {
      UserId,
      description,
    });
    return res.data;
  } catch (error) {
    console.error('[CREATE a Tweet failed:]:', error);
  }
};

//取得特定推文的所有回覆
export const getTweetReplies = async (pathId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${pathId}/replies`);
    return res.data;
  } catch (error) {}
};

//回覆貼文
export const repliedTweet = async (payload) => {
  try {
    const { UserId, TweetId, comment } = payload;
    const res = await axiosInstance.post(
      `${baseUrl}/tweets/${TweetId}/replies`,
      {
        UserId,
        comment,
      }
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error('[Reply Tweet failed:]:', error);
  }
};

//跟隨使用者
export const userFollowing = async (id) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, {
      id,
    });

    // console.log(res);

    return res.data;
  } catch (error) {
    console.error('[Following failed:]:', error);
  }
};
//取消跟隨
export const cancelFollow = async (followingId) => {
  try {
    const res = await axiosInstance.delete(
      `${baseUrl}/followships/${followingId}`
    );
    return res.data;
  } catch (error) {
    console.error('[Cancel Follow failed:]:', error);
  }
};

//喜歡貼文
export const likeTweet = async (id) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${id}/like`);
    return res.data;
  } catch (error) {
    console.error('[Like Tweet failed:]:', error);
  }
};

//取消喜歡貼文
export const unlikeTweet = async (id) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${id}/unlike`);
    return res.data;
  } catch (error) {
    console.error('[Unlike Tweet failed:]:', error);
  }
};

//設定頁面取得用戶資訊
export const getSettingInfo = async (memberId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${memberId}`);
    return res.data;
  } catch (error) {
    console.error('[Get USer Info failed:]:', error);
  }
};

//修改用戶資訊
export const editSettingInfo = async (payload) => {
  try {
    const { memberId, name, account, email, password, checkPassword } = payload;
    const res = await axiosInstance.patch(`${baseUrl}/users/${memberId}`, {
      name,
      account,
      email,
      password,
      checkPassword,
    });
    return res;
  } catch (error) {
    const errorMessage = error.response.data;
    console.error('[Edit Setting Info failed:]:', error);
    return errorMessage;
  }
};

//取的被跟隨者
export const getUserFollower = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/followers`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//取的正在跟隨者
export const getUserFollowing = async (userId) => {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/users/${userId}/followings`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
