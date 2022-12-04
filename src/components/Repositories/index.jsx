import React from 'react'
import './Repositories.scss'

function Repositories({name, pub, language, pushed_at}) {
  
  return (
    <div className='repos'>
      <div className="repos__name">
        <h3>{name}</h3>
        <span>{pub === false ? 'Public' : 'Private'}</span>
      </div>
      <div className="repos__language">
        <p>{language}</p>
      <span>Updated {pushed_at.slice(0,10)}</span>
      </div>
    </div>
  )
}

export default Repositories
