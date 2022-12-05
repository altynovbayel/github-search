import React from 'react';
import {api} from "../../config/api";
import './Followers.scss'
import {AiOutlineArrowLeft} from "react-icons/ai";

function Followers({ setState, username}) {
  const [data, setData] = React.useState([])
  
  React.useEffect(() => {
    api.getFollowers(username).then(r => setData(r.data))
  }, [])
  
  
  if(!data) return <h2>loading</h2>
  return (
    <div className='followers'>
      <button className='prev_btn' onClick={() => setState(false)} >
        <AiOutlineArrowLeft/>
      </button>
      {
        data.map(item => (
          <div className='followers_person' key={item.id}>
            <img src={item.avatar_url} alt="" />
            <p>
              {item.login}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default Followers;