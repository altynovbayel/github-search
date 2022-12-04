import React from 'react'
import Header from '../../components/Header'
import Repositories from '../../components/Repositories'
import SearchRepo from '../../components/SearchRepo'
import UserProfile from "../../components/UserProfile";
import {api} from "../../config/api";

function UserDetails({login}) {
  const [user, setUser] = React.useState('')
  const [repos, setRepos] = React.useState('')
  
  React.useEffect(() => {
    api.getUser(login).then(r => r && setUser(r.data))
    api.getRepos(login).then(r => r && setRepos(r.data))
  }, [login])
  
  if(!user || !repos) return <h1>loading</h1>
  return (
    <div className='main'>
      <div className="main__row">
        <UserProfile {...user} />
        <div className="main__repos">
          <SearchRepo repos={repos} />
          {
          repos &&
          repos.map((item, id) => {
            return <Repositories key={id} {...item} pub={item.private} />
          })
          }
        </div>
      </div>
    </div>
  )
}

export default UserDetails
