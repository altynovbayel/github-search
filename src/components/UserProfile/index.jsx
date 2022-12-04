import React from 'react'
import './UserProfile.scss'
import {MdPeopleAlt} from 'react-icons/md'

function UserProfile(
  {
    avatar_url, 
    login, 
    name, 
    bio, 
    followers,
    following,
  }) {
return (
  <div className='profile'>
    <div className="profile__block">
      <div className="profile__title">
        <div className="profile__img">
          <img src={avatar_url} alt="" />
        </div>
        <div className="profile__names">
          <p className='profile__name'>{name}</p>
          <span className='profile__login'>{login}</span>
        </div>
      </div>
      <div className="profile__bio">
        <p className="profile__bio-text">{bio}</p>
      </div>
      <div className="profile__followers">
        <MdPeopleAlt/>
        <p>
          <span>{followers}</span> followers
        </p>
        ·
        <p>
          <span>{following}</span> following
        </p>
      </div>
    </div>
  </div>
)
}

export default UserProfile