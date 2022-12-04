import React from 'react'
import './Header.scss'
import {BsGithub} from 'react-icons/bs'
import { api } from '../../config/api'
import {useNavigate} from 'react-router-dom'


function Header({setUser}) {
  const [findUser, setFindUser] = React.useState('')
  const [users, setUsers] = React.useState('')
  
  const navigate = useNavigate()

  React.useEffect(() => {
    findUser.length > 3 &&
    api.findUser(findUser).then(r => setUsers(r.data.items))

    findUser.length < 3 && setUsers('')
  }, [findUser])
  
  return (
    <div className='header'>
      <div className="header__container">
        <div className="header__row">
          <div className="header__logo">
            <BsGithub onClick={() => navigate('/')}/>
          </div>
          <div className="header__input">
            <input type="text" placeholder='user search' onChange={e => setFindUser(e.target.value)}/>
            <div className="dropdown">
              {
                users &&
                users.map((item, id) => (
                  <div key={id} className="user" onClick={() => {
                    setUsers('')
                    setUser(item.login)
                    navigate('/user')
                  }}>
                    <p>
                      {item.login}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
