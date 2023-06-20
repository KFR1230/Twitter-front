import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputGroup from './InputGroup';
import { useAuth } from '../context/AuthContext';
import { editSettingInfo, getSettingInfo } from '../../api/twitter';
import { useState } from 'react';
// import { getUserTweets } from '../api/twitter';
import iconNotiSuccess from '../../assets/images/icon/alert-success-2.svg';
import iconNotiWanrning from '../../assets/images/icon/alert-warning-2.svg';
import Swal from 'sweetalert2';
const SettingForm = () => {
  const navigate = useNavigate();
  const { isAuthentic, member } = useAuth();
  const [settingInfo, setSettingInfo] = useState({
    id: 'null',
    account: '',
    email: '',
    name: '',
  });
  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

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
    // didOpen: (toast) => {
    //   toast.addEventListener('mouseenter', Swal.stopTimer);
    //   toast.addEventListener('mouseleave', Swal.resumeTimer);
    // },
  });

  const onSubmit = async (data) => {
    const res = await editSettingInfo({
      memberId: member.id,
      account: data.account,
      name: data.name,
      email: data.email,
      password: data.password,
      checkPassword: data.cpassword,
    });
    // console.log(data);
    // console.log(res);
    if (res.status === 200) {
      // console.log(res);
      reset();
      setSettingInfo({
        id: res.data.id,
        account: res.data.account,
        email: res.data.email,
        name: res.data.name,
      });
      ToastSuccess.fire({
        title: '成功修改',
      });
    } else {
      ToastWarning.fire({
        title: `${res.message}`,
      });
      setSettingInfo(settingInfo);
    }
  };

  useEffect(() => {
    const getSettingInfoAsync = async () => {
      const data = await getSettingInfo(member.id);
      setSettingInfo(data);
    };
    getSettingInfoAsync();
  }, [setSettingInfo]);

  useEffect(() => { 
    if (!isAuthentic) {
      navigate('/login');
    }
    // console.log(member);
  }, [navigate, isAuthentic, member]); //只要isAuthentic或navigation有變化便執行

  return (
    <div className='formLayout setting-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-group-container'>
          <InputGroup
            name='account'
            label='帳號'
            type='text'
            placeholder='請輸入帳號'
            defaultValue={settingInfo.account}
            // maxLength='50'
            errors={errors}
            register={register}
            validationSchema={{
              required: '請輸入帳號',
              minLength: {
                value: 3,
                message: '帳號請輸入至少三個字',
              },
              maxLength: {
                value: 50,
                message: '字數超出上限！',
              },
            }}
            watch={watch}
            // required
          />
        </div>
        <div className='input-group-container'>
          <InputGroup
            name='username'
            label='名稱'
            type='text'
            placeholder='請輸入名稱'
            defaultValue={settingInfo.name}
            // maxLength='50'
            errors={errors}
            register={register}
            validationSchema={{
              required: '請輸入名稱',
              minLength: {
                value: 3,
                message: '帳號請輸入至少三個字',
              },
              maxLength: {
                value: 50,
                message: '字數超出上限！',
              },
            }}
            watch={watch}
            // required
          />
        </div>

        <div className='input-group-container'>
          <InputGroup
            name='email'
            label='Email'
            type='email'
            placeholder='請輸入Email'
            defaultValue={settingInfo.email}
            errors={errors}
            register={register}
            validationSchema={{
              required: '請輸入Email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '請輸入正確的Email',
              },
            }}
            // required
            watch={watch}
          />
        </div>

        <div className='input-group-container'>
          <InputGroup
            name='password'
            label='密碼'
            type='password'
            placeholder='請輸入密碼'
            errors={errors}
            register={register}
            validationSchema={{
              required: '請輸入密碼',
              minLength: {
                value: 8,
                message: '密碼請輸入至少8位',
              },
            }}
            // required
            watch={watch}
          />
        </div>

        <div className='input-group-container'>
          <InputGroup
            name='cpassword'
            label='密碼再確認'
            type='password'
            placeholder='請再次輸入密碼'
            errors={errors}
            register={register}
            validationSchema={{
              //@ 確認密碼做法？ (還沒有試)
              //https://www.positronx.io/add-confirm-password-validation-in-react-with-hook-form/
              required: '請再次輸入密碼',
              minLength: {
                value: 8,
                message: '密碼請輸入至少8位',
              },
            }}
            // required
            watch={watch}
          />
        </div>

        <div className='button-group-row login-button-group'>
          <button className='button-bg button-m active' type='submit'>
            儲存
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingForm;
