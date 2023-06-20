import React from "react";

const TweetUserName2 = ({name, account})=>{
    return (
        <div className='tweet-username-2'>
          <span className='user-name'>
            {name}
          </span>
          <span className='user-account'>
            @{account}
          </span>
        </div>
    )
  }

  export default TweetUserName2;