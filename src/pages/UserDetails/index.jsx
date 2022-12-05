import React from 'react'
import './UserDetails.scss'
import Repositories from '../../components/Repositories'
import SearchRepo from '../../components/SearchRepo'
import UserProfile from "../../components/UserProfile";
import {api} from "../../config/api";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import Followers from "../../components/Followers";
import Following from "../../components/Following";

function UserDetails({login}) {
  const [user, setUser] = React.useState('')
  const [repos, setRepos] = React.useState('')
  const [currentArr, setCurrentArr] = React.useState('')
  const [copy, setCopy] = React.useState('')
  const [followers, setFollowers] = React.useState(false)
  const [following ,setFollowing] = React.useState(false)
  
  const len = 10
  const [page, setPage] = React.useState(1);
  const pageCount = Math.ceil(copy.length / len)
  const lastContentIndex = page * len;
  const firstContentIndex = lastContentIndex - len;
  
  React.useEffect(() => {
    api.getUser(login).then(r => r && setUser(r.data))
    api.getRepos(login).then(r => {
      r && setRepos(r.data)
      setCopy(r.data)
    })
  }, [login])
  
  React.useEffect(() => {
    setCurrentArr(copy.slice(firstContentIndex, lastContentIndex))
  },[page, copy])
  
  if (!user || !repos) return <h1>loading</h1>
  return (
    <div className='main'>
      <div className="main__row">
        <UserProfile {...user} setFollowing={setFollowing} setFollowers={setFollowers}/>
        {
          followers === true ? <Followers setState={setFollowers} username={login} />
            : following === true ? <Following setState={setFollowing} username={login} /> :
              <div className="main__repos">
                <SearchRepo repos={repos} setCopy={setCopy}/>
                {
                  currentArr &&
                  currentArr.map((item, id) => {
                    return <Repositories key={id} {...item} pub={item.private}/>
                  })
                }
                <div className='pagination'>
                  <button onClick={e => {
                    e.preventDefault()
                    page > 1 && setPage(prev => prev - 1)
                  }}>
                    <AiOutlineArrowLeft/>
                  </button>
                  {page} / {pageCount}
                  <button onClick={e => {
                    e.preventDefault()
                    page < pageCount && setPage(prev => prev + 1)
                  }}>
                    <AiOutlineArrowRight/>
                  </button>
                </div>
              </div>
        }
        
      </div>
    </div>
  )
}

export default UserDetails
