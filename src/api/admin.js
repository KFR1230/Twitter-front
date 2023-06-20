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

//@/api/admin/users
export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/admin/users`); //watch的屬性名作為path
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log('[Get Admin Users failed]:', error);
  }
};

export const getAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/admin/tweets`); //watch的屬性名作為path
    //console.log(res.data[0].data)//{status: 'success', data: {…}}data: {tweets: Array(7)}status: "success"[[Prototype]]: Object
    return res.data; //{tweets: Array(54)}
  } catch (error) {
    console.log('[Get Tweets failed]:', error);
  }
};

//刪除tweet
// export const cancelFollow = async (followingId) => {
export const deleteUserTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.delete(
      `${baseUrl}/admin/tweets/${tweetId}`
    );
    return res.data;
  } catch (error) {
    console.error('[Cancel Follow failed:]:', error);
  }
};
