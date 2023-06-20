import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';
import { useAuth } from '../context/AuthContext';
//modal dialog套件
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import iconNotiSuccess from '../../assets/images/icon/alert-success-2.svg';
import iconNotiWanrning from '../../assets/images/icon/alert-warning-2.svg';

const RegisterForm = () => {
  const { signUp, isAuthentic } = useAuth();
  const navigate = useNavigate();

  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

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
    // didOpen: (toast) => {
    //   toast.addEventListener('mouseenter', Swal.stopTimer);
    //   toast.addEventListener('mouseleave', Swal.resumeTimer);
    // },
  });

  const onSubmit = async (data) => {
    if (data.password.length === 0) {
      return;
    }
    // -- 掛載useAuth context 寫法
    const { success, errorMessage } = await signUp({
      account: data.account,
      email: data.email,
      password: data.password,
      checkPassword: data.cpassword,
      name: data.username,
    });

    if (success) {
      // alert('註冊成功!');
      // console.log('Register: ', success);
      ToastSuccess.fire({
        title: '註冊成功!',
      });
      reset();
      navigate('/login');

      return;
    } else {
      // console.log('Register: ', success);
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
    <div className='formLayout register-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-group-container'>
          <InputGroup
            name='account'
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
            // required
          />
        </div>
        <div className='input-group-container'>
          <InputGroup
            name='username'
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
        <div className='button-group-column'>
          <button className='button-filled button-lg' type='submit'>
            註冊
          </button>
          <Link to='/login' className='button-link'>
            取消
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
