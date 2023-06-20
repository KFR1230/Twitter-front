import React from 'react';
import { useForm } from 'react-hook-form';
// import { createTweet } from '../../api/twitter';
// import { useAuth } from '../../components/context/AuthContext';

import UserAvatar from '../basic/UserAvatar';
// import testAvatar from '../../assests/images/avatar1.jpg';

const TweetCardForm = ({
  avatar,
  onAddTweet,
  onModalAddTweet,
  // setTweets,
  // tweets,
}) => {
  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // watch,
  } = useForm();

  const onSubmit = (data) => {
    // 如果是只要給api
    // 就在這設定 person,再給api,不需要setState
    if (onAddTweet) {
      onAddTweet(data);
    }
    if (onModalAddTweet) {
      onModalAddTweet(data);
    }
    //清除表單
    reset();
  };

  return (
    <>
      <div className='formLayout tweet-card-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group-inner-wrapper'>
            <UserAvatar avatar={avatar} />
            <div className='textarea-group-container'>
              <div className='grow-wrap'>
                <textarea
                  type='textarea'
                  id='description'
                  name='description'
                  {...register('description', {
                    required: true,
                    maxLength: 140,
                  })}
                  placeholder='有什麼新鮮事？'
                  // maxLength='140'
                  className={`tweet-text-area ${
                    errors.description ? 'error' : ''
                  }`}
                />
              </div>
            </div>
          </div>
          <div>
            {errors.description && errors.description.type === 'required' && (
              <span className='error'>內容不可空白</span>
            )}
            {errors?.description?.type === 'maxLength' && (
              <span className='error'>字數超出上限！</span>
            )}
            <button className='button-md button-m active' type='submit'>
              推文
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TweetCardForm;
