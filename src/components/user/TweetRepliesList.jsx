import TweetRepliesCard from '../basic/TweetRepliesCard';

const TweetRepliesLists = ({tweetReplies,account,onClick}) => {

  return (
    <div className='TweetLists'>
      {tweetReplies.map((tweet) => {
        return (
          <TweetRepliesCard
            key={tweet.id}
            {...tweet}
            account={account}
            onClick={({  userId }) => {
              onClick?.({ userId });
            }}
          />
        );
      })}
    </div>
  );
};

export default TweetRepliesLists;
