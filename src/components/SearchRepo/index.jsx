import React from 'react'
import './SearchRepo.scss'
import {IoMdArrowDropdown} from 'react-icons/io'
import ModalWindow from './ModalWindow'
import { selectBtn } from '../../utils/list'
import { selectList } from '../../utils/list'
import { api } from '../../config/api'


function SearchRepo({repos}) {
  const [filter, setFilter] = React.useState('')
  const [typeArr, setTypeArr] = React.useState([])
  const [active, setActive] = React.useState(false)


  const [change, setChange] = React.useState('')
  const [sort, setSort] = React.useState('')
  const [language, setLanguage] = React.useState('')


  // что бы взять все использованные языки
  const allLang = repos.filter(item => item.language !== null).map(item => item.language)
  const newSet = new Set(allLang)
  const filteredLang = Array.from(newSet)

  React.useEffect(() => {
    if(filter === 'type'){
      setTypeArr(selectList.selectType)
    }else if(filter === 'sort'){
      setTypeArr(selectList.selectSort)
    }
  }, [filter])

  // React.useEffect(() => {
  //   api.reposFilter('',change,language,sort).then()
  // }, [filter])
  
  
  
  return (
    <div className='search__repo'>
      {
        active === true &&
        filter === 'type' && 
        <ModalWindow 
          title={filter} 
          list={typeArr} 
          setState={setActive}
          setChange={setChange}
          change={change}
        />
      }
      {
        active === true &&
        filter === 'sort' && 
        <ModalWindow 
          title={filter} 
          list={typeArr} 
          setState={setActive}
          setChange={setSort}
          change={sort}
        />
      }
      {
        active === true &&
        filter === 'language' && 
        <ModalWindow 
          title={filter} 
          list={filteredLang} 
          setState={setActive}
          setChange={setLanguage}
          change={sort}
        />
      }
      <div className="repo__input">
        <input type="text" placeholder='Find a repository'/>
      </div>
      <div className="repo__filter">
        {
          selectBtn.map((item, id) => (
            <button 
              key={id}
              id={item}
              onClick={(e) => {
              setFilter(e.target.id)
              setActive(true)
              }}
            >
              {item} <IoMdArrowDropdown/>
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default SearchRepo
