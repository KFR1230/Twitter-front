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

//要記得export外面才能用
export const getUserInfo = async (pathId) => {
  try {
    // 獲得todo end point
    // const res = await axios.get(`${baseUrl}/userinfo`);
    const res = await axiosInstance.get(`${baseUrl}/users/${pathId}`);

    //server 回傳的物件會包在data,所以一定要用.data才會拿到對的資料
    // console.log(res.data.data);
    // console.log(res)
    return res.data;
  } catch (error) {
    console.error('[getUser Info failed]', error);
  }
};

// 更新個人資料
export const updateUserInfo = async (payload) => {
  try {
    const {
      id,
      // data,
      img,
    } = payload;

    const res = await axiosInstance.put(`${baseUrl}/users/${id}`, img);

    return { success: true, ...res };
    // return res.data;
  } catch (error) {
    const errorMessage = error.response.data;
    console.error('[getUser Info failed]', error);
    return { success: false, errorMessage: errorMessage };
  }
};

// 更新個人資料-photo VERSION
export const updateUserPhoto = async (payload) => {
  try {
    const res = await axiosInstance.put(`${baseUrl}/users/74`, FormData);

    //server 回傳的物件會包在data,所以一定要用.data才會拿到對的資料
    // console.log('res data', res.data);
    return res.data;
  } catch (error) {
    console.error('[getUser Info failed]', error);
  }
};
