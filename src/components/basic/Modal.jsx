import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import component
import ModalContent from './ModalContent';
import UserAvatar from './UserAvatar';
import UserBk from './UserBk';
import InputGroup from '../forms/InputGroup';
import { ModalHeaderIcon } from './ModalHeader';

import { getUserInfo, updateUserInfo } from '../../api/userinfo';
import { useAuth } from '../../components/context/AuthContext';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

//import svg
import iconCamera from '../../assets/images/icon/addphoto.svg';
import iconClose from '../../assets/images/icon/close.svg';
import iconNotiSuccess from '../../assets/images/icon/alert-success-2.svg';
import iconNotiWanrning from '../../assets/images/icon/alert-warning-2.svg';

const defaultBk = 'https://i.imgur.com/ZFz8ZEI.png';
// const defaultAvatar = 'https://i.imgur.com/V4RclNb.png';
// @ 用來上傳更新自我資料用
const formData = new FormData();

const Modal = () => {
  const { isAuthentic, member, setModalProOpen } = useAuth(); // 取出需要的狀態與方法
  const [profile, setProfile] = useState({
    name: '',
    introduction: '',
    avatar: '',
    banner: '',
  });
  const navigate = useNavigate();
  // 客製toast 元件
  const ToastSuccess = Swal.mixin({
    toast: true,
    html: `<div>
    <img src="${iconNotiSuccess}" class="icon-alert-noti"/>
    </div>`,
    showConfirmButton: false,
    position: 'top',
    width: '394px',
    // height: '96px',
    timer: 3000,
    timerProgressBar: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });

  const ToastWarning = Swal.mixin({
    toast: true,
    html: `<div>
    <img src="${iconNotiWanrning}" class="icon-alert-noti"/>
    </div>`,
    showConfirmButton: false,
    position: 'top',
    width: '394px',
    height: '96px',
    timer: 3000,
    timerProgressBar: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });

  //@ upload photo用
  const uploadedImage = useRef(null); // 預覽照片用
  const imageUploader = useRef(null); // 拿到input file avatar狀態
  const imageUploader_bk = useRef(null); // 拿到input file bk狀態
  const [imageNewUrl, setImageNewUrl] = useState(''); //預覽後把取的avtar圖片存的變數
  const [imageNewUrl_bk, setImageNewUrl_bk] = useState(''); //預覽後把取的bk圖片存的變數
  const [imageChanging, setImageChanging] = useState(false);

  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: profile.name,
      introduction: profile.introduction,
      avatar: profile.avatar,
      banner: profile.banner,
    },
  });

  // 打 /api/users/id
  const getUserInfoAsync = async () => {
    try {
      const profile = await getUserInfo(member.id);
      if (profile) {
        setProfile(profile);
        setImageNewUrl_bk(profile.banner);
        setImageNewUrl(profile.avatar);
      }
    } catch (error) {
      console.error('[getUser Info  with Async failed]', error);
    }
  };

  //儲存form
  const onSubmit = async (data) => {
    // 如果是只要給api
    // console.log('we get data', data);
    // console.log('onSubmit formData.get');
    // console.log(formData.get('avatar'));
    // console.log(formData.get('banner'));

    // console.log(member.id);
    try {
      //@ 加入input值
      if (formData.get('name')) {
        formData.delete('name');
      }
      formData.append('name', data.name);

      if (formData.get('introduction')) {
        formData.delete('introduction');
      }

      formData.append('introduction', data.introduction);

      const res = await updateUserInfo({
        id: member.id,
        // data: data,
        img: formData,
      });

      if (res.status === 200) {
        // console.log('SUCCESS!');
        setModalProOpen(false);
        ToastSuccess.fire({
          title: '上傳照片成功!',
        });
      } else {
        setModalProOpen(true);
        ToastWarning.fire({
          title: `圖檔不符合,請使用jpg/png/gif`,
        });
      }
      for (var key of formData.keys()) {
        // console.log(key);
        formData.delete(key);
      }
    } catch (error) {
      ToastWarning.fire({
        title: `${error}`,
      });
    }
  };

  // @照片預覽+設定formData //bk與avatar相同
  const handleImageUpload = (e) => {
    // console.log(e.target.className);

    //@先設定formData拿input file avatar/bk的file
    const avatarFile = imageUploader.current.files[0];
    const bannerFile = imageUploader_bk.current.files[0];

    // @預覽功能-先看是哪一個換圖(用className區分)
    let curr_target = 'input-file-avatar';
    if (e.target.className === 'input-file-bk') {
      curr_target = 'input-file-bk';

      // 以免重複存圖在formData，要清空formData,不然換幾次會多拿幾個檔案
      if (formData.get('banner')) {
        formData.delete('banner');
      }
      formData.append('banner', bannerFile);
    } else {
      // 以免重複存圖在formData，要清空formData,不然換幾次會多拿幾個檔案
      if (formData.get('avatar')) {
        formData.delete('avatar');
      }
      formData.append('avatar', avatarFile);
    }

    // @預覽功能-把圖換上去（這裡會把圖檔換轉base64）
    const [file] = e.target.files;
    
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        if (curr_target === 'input-file-avatar') {
          //把imageUrl存下來
          setImageNewUrl(e.target.result);
          //利用空的input可以用 react-hook-form傳出去
          // setValue('avatar', e.target.result);
        } else if (curr_target === 'input-file-bk') {
          //把imageUrl存下來
          setImageNewUrl_bk(e.target.result);
          setImageChanging(true);
          //利用空的input可以用 react-hook-form傳出去
          // setValue('banner', e.target.result);
        }
      };
      // 照片在預覽的時候要讀取base64照片編碼的寫法
      reader.readAsDataURL(file);
    }
  };

  //照片換回原本背景照片
  const handleImageDelete = (e) => {
    // alert('換回原本背景照片');
    setImageNewUrl_bk(profile.banner ? profile.banner : defaultBk);
    //新設要送出的form value
    setValue('banner', profile.banner ? profile.banner : defaultBk);
    //取消按鈕隱藏
    setImageChanging(false);
  };

  //@ 首次載入profile
  useEffect(() => {
    getUserInfoAsync();
  }, []);

  // @ 首次載入因profile 帳號出不來form要reset
  useEffect(() => {
    reset({ ...profile });
  }, [profile, reset]);

  useEffect(() => {
    if (!isAuthentic) {
      navigate('/login');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <>
      <ModalContent>
        <ModalHeaderIcon
          setModalProOpen={setModalProOpen}
          onSubmit={onSubmit}
        />
        <div className='modal-content'>
          <div className='profile-bk-wrapper'>
            <UserBk bkUrl={imageNewUrl_bk} />
            <img
              alt='bk-camera'
              src={iconCamera}
              className='icon-camera'
              ref={uploadedImage}
              onClick={() => imageUploader_bk.current.click()}
            />
            {imageChanging && (
              <img
                src={iconClose}
                alt='icon of close button'
                className='icon-close'
                onClick={handleImageDelete}
              />
            )}

            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              ref={imageUploader_bk}
              className='input-file-bk'
              //@ sam 需要的上傳規格 name='banner'
              name='banner'
              id='banner'
            />
          </div>

          <div className='avatar-edit-wrapper'>
            <UserAvatar avatar={imageNewUrl} />
            <img
              alt='bk-camera'
              src={iconCamera}
              className='icon-camera'
              ref={uploadedImage}
              onClick={() => imageUploader.current.click()}
            />

            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              ref={imageUploader}
              className='input-file-avatar'
              //@ sam 需要的上傳規格 name='avatar'
              name='avatar'
              id='avatar'
            />
          </div>

          <form
            className='modal-info-form'
            id='hook-form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='input-group-container'>
              <InputGroup
                name='name'
                label='名稱'
                type='text'
                placeholder='請輸入名稱'
                // maxLength='50'
                errors={errors}
                register={register}
                validationSchema={{
                  required: '請輸入名稱',
                  minLength: {
                    value: 3,
                    message: '請輸入至少3字',
                  },
                  maxLength: {
                    value: 50,
                    message: '最多不可輸入超過50字',
                  },
                }}
                watch={watch}
                limitLabel={true}
              />
            </div>
            <div className='textarea-group-container'>
              <div className='textarea-group grow-wrap'>
                <label>自我介紹</label>
                <textarea
                  type='textarea'
                  id='introduction'
                  name='introduction'
                  {...register('introduction', {
                    required: true,
                    maxLength: 160,
                  })}
                  placeholder='請輸入你的自我介紹'
                  className={`desc-text-area ${
                    errors.introduction ? 'error' : ''
                  }`}
                  // value={profile.introduction || ''}
                />
              </div>
              <div className='error-message-group'>
                {errors.introduction &&
                  errors.introduction.type === 'required' && (
                    <span className='error'>請輸入你的自我介紹</span>
                  )}
                {errors?.introduction?.type === 'maxLength' && (
                  <span className='error'>最多不可輸入超過160字</span>
                )}

                <span className='limit-num'>
                  {watch('introduction') ? watch('introduction').length : '0'}
                  /160
                </span>
              </div>
            </div>

            {/* <input
              type='text'
              {...register('banner')}
              style={{
                display: 'none',
              }}
            />
            <input
              type='text'
              name='avatar'
              id='avatar'
              {...register('avatar')}
              style={{
                display: 'none',
              }}
            /> */}
          </form>
        </div>
      </ModalContent>
    </>
  );
};

export default Modal;
