import React from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import './ModalWindow.scss'

function ModalWindow({title, list, setState, setChange, change}) {
  
  return (
    <div className='modal'>
      <div className="modal__header">
        <p>
          Select {title}
        </p>
        <button className='close__btn'>
          <IoMdClose onClick={() => setState(false)}/>
        </button>
      </div>
      <ul className="modal__list">
        {
          list.map((item, id) => (
            <span key={id}>
              <li onClick={() => {
                setChange(item)
                setState(false)
              }}>
                <span>
                  {item === change && <BsCheck2/>}
                </span>
                {item}
              </li>
            </span>
          ))
        }
      </ul>
    </div>
  )
}

export default ModalWindow
