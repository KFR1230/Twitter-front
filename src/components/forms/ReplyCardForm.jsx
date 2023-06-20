import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { repliedTweet } from '../../api/twitter';

// import InputGroup from './InputGroup';
import UserAvatar from '../basic/UserAvatar';
import { useAuth } from '../context/AuthContext';
// import testAvatar from '../../assests/images/avatar1.jpg';

const TweetCardForm = ({ avatar, tweetInfo }) => {
  const { member, setModalReplyOpen } = useAuth();
  const navigate = useNavigate();
  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // watch,
  } = useForm();

  const onSubmit = async (data) => {
    // 如果是只要給api
    // 就在這設定 person,再給api,不需要setState
    // alert('觸發onSubmit');
    // console.log(data.description);
    // setNewTweet(data);
    // onAddTweet?.(data);
    // console.log(data);
    // console.log(tweetInfo);
    const info = await repliedTweet({
      UserId: member.id,
      TweetId: tweetInfo.id,
      comment: data.description,
    });
    setModalReplyOpen(false);
    navigate(`/main/tweet/${tweetInfo.id}`);
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
                  placeholder='推你的回覆？'
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
              回覆
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TweetCardForm;
