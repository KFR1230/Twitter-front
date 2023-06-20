import axios from 'axios';

// const baseUrl = 'http://localhost:3004';
const baseUrl = 'https://calm-eyrie-50498.herokuapp.com/api';
// const baseUrl = 'https://agile-forest-26034.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/signin`, {
      account,
      password, //解構拿出data
    });
    const { token } = data.data; //解構拿出authToken
    // console.log('Token: ', token);
    // console.log('data:', data);
    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    const res = error.response.data;
    console.error('[Login Failed]:', error);
    return { success: false, errorMessage: res };

    // return error.response.data.message;
    // if (error.response) {
    //   /*
    //    * The request was made and the server responded with a
    //    * status code that falls out of the range of 2xx
    //    */
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   // console.log(error.response.headers);
    //   // return error.response.data;
    // } else if (error.request) {
    //   /*
    //    * The request was made but no response was received, `error.request`
    //    * is an instance of XMLHttpRequest in the browser and an instance
    //    * of http.ClientRequest in Node.js
    //    */
    //   console.log(error.request);
    // } else {
    //   // Something happened in setting up the request and triggered an Error
    //   console.log('Error', error.message);
    // }

    // return error.response;
  }
};

export const signUp = async ({
  account,
  email,
  password,
  checkPassword,
  name,
}) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users`, {
      account,
      email,
      password,
      checkPassword,
      name,
    });

    // console.log('we got data', data);

    //用解構式帶出data
    //登入成功的結果
    // const { authToken } = data;
    // if (authToken) {
    //   console.log('拿到token', data);
    //   return { success: true, ...data };
    // }

    //註冊成功的結果
    return { success: true, ...data };
  } catch (error) {
    const res = error.response.data;
    console.error('["Register failed"]', error);
    return { success: false, errorMessage: res };
  }
};

export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/admin/users`, {
      account,
      password, //解構拿出data
    });
    const { token } = data.data; //解構拿出authToken
    // console.log('Token: ', token);
    // console.log('data:', data);
    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    const res = error.response.data;
    console.error('[admin login Failed]:', error);
    return { success: false, errorMessage: res };
  }
};
