import { useEffect } from 'react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';
import { useAuth } from '../context/AuthContext';
//modal dialog套件
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
// import withReactContent from 'sweetalert2-react-content';
import iconNotiSuccess from '../../assets/images/icon/alert-success-2.svg';
import iconNotiWanrning from '../../assets/images/icon/alert-warning-2.svg';

const LoginForm = () => {
  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const { login, isAuthentic } = useAuth();
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

  const onSubmit = async (data) => {
    if (data.username.length === 0) {
      return;
    }
    if (data.password.length === 0) {
      return;
    }
    const { success, errorMessage } = await login({
      account: data.username,
      password: data.password,
    });

    if (success) {
      // console.log('Login: ', success);
      ToastSuccess.fire({
        title: '登入成功!',
      });
      reset();
      return;
    } else {
      // console.log('Login: ', success);
      ToastWarning.fire({
        title: `${errorMessage.message}`,
      });
    }
  };

  useEffect(() => {
    if (isAuthentic) {
      navigate('/main');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <div className='formLayout login-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-group-container'>
          <InputGroup
            name='username'
            label='帳號'
            type='text'
            placeholder='請輸入帳號'
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
            // limitLabel='true'
            // onChange={handleInputChange}
            // setInputValue={setInputValue}
            // required
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
        <button className='button-filled button-lg' type='submit'>
          登入
        </button>
        <div className='button-group-row login-button-group'>
          <Link to='/register' className='button-link'>
            註冊
          </Link>
          <span>・</span>
          <Link to='/login/admin' className='button-link'>
            後台登入
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
