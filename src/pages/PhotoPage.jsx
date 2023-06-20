import React, { useRef } from 'react'; // 引入React庫和useRef hook
import { updateUserPhoto } from '../api/userinfo';

const PhotoPage = () => {
  // 使用useRef hook創建一個引用，指向輸入元素
  const avatarInputRef = useRef();
  const bannerInputRef = useRef();
  const nameInputRef = useRef();
  const introInputRef = useRef();

  const handleSubmit = async (e) => {
    // 定義當表單提交時要執行的異步函數
    e.preventDefault(); // 防止表單的預設提交行為

    const formData = new FormData(); // 創建一個新的FormData對象來存儲將要上傳的文件

    // 從input元素中獲取用戶選擇的文件，並將其添加到FormData對象中
    const avatarFile = avatarInputRef.current.files[0];
    if (avatarFile) {
      console.log('if avatar file');
      formData.append('avatar', avatarFile);
    }

    const bannerFile = bannerInputRef.current.files[0];
    if (bannerFile) {
      console.log('if banner file');
      formData.append('banner', bannerFile);
    }

    // 使用axios庫將FormData對象發送到後端伺服器
    // try {
    //   const response = await axios.put(
    //     'https://calm-eyrie-50498.herokuapp.com/api/users/64',{
    //       // 這裡的data是前面打包的
    //       //name, introduction, avatar,banner
    //       name: "eva",
    //       introduction: "heyhey",
    //       avatar: formData.get('avatar'),
    //       banner: formData.get('banner'),
    //     }

    //   );
    //   console.log('Uploaded successfully!');
    // } catch (err) {
    //   console.log('Upload failed.', err); // 如果發生錯誤，則在控制台中打印錯誤消息
    // }

    // My OTHER VALUE
    const nameGetValue = nameInputRef.current.value;
    const introGetValue = introInputRef.current.value;
    // MY API
    // console.log(nameGetValue);
    // console.log(introGetValue);
    console.log(formData);
    for (let [a, b] of formData.entries()) {
      console.log(a, b, '--------------');
    }

    try {
      // console.log('onSubmit formData.get')
      // console.log(formData.get('avatar'))
      const addData = await updateUserPhoto({
        id: '74',
        name: nameGetValue,
        introduction: introGetValue,
        img: formData,
      });
      if (addData) {
        console.log('success upload!');
        return { success: true, ...addData };
      }
      console.log('data to api', addData);
    } catch (error) {
      console.error('[getUser Info  with Async failed]', error);
    }
  };

  // 返回一個包含表單和兩個文件輸入的React元素
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div className='form-row mb-3'>
          <label className='form-label' htmlFor='avatar'>
            NAME
          </label>
          <input
            className='form-control'
            type='text'
            name='name'
            id='name'
            ref={nameInputRef}
          />
        </div>
        <div className='form-row mb-3'>
          <label className='form-label' htmlFor='avatar'>
            INTRO
          </label>
          <input
            className='form-control'
            type='text'
            id='introduction'
            name='introduction'
            ref={introInputRef}
          />
        </div>
        <div className='form-row mb-3'>
          <label className='form-label' htmlFor='avatar'>
            Avatar
          </label>
          <input
            className='form-control'
            type='file'
            id='avatar'
            name='avatar'
            ref={avatarInputRef}
          />
        </div>
        <div className='form-row mb-3'>
          <label className='form-label' htmlFor='banner'>
            Banner
          </label>
          <input
            className='form-control'
            type='file'
            id='banner'
            name='banner'
            ref={bannerInputRef}
          />
        </div>
        <button type='submit'>Upload</button>
        {/* // */}
        {/* 當此按鈕被點擊時，會觸發上述的handleSubmit函數 */}
      </form>
    </div>
  );
};

export default PhotoPage; // 導出App組件
