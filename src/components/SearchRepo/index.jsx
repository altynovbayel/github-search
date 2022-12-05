import React from 'react'
import './SearchRepo.scss'
import {IoMdArrowDropdown} from 'react-icons/io'
import ModalWindow from './ModalWindow'
import { selectBtn } from '../../utils/list'
import { selectList } from '../../utils/list'

function SearchRepo({repos, setCopy}) {
  const [filter, setFilter] = React.useState('')
  const [typeArr, setTypeArr] = React.useState([])
  const [active, setActive] = React.useState(false)
  
  const [inputVal, setInputVal] = React.useState('')

  const [change, setChange] = React.useState('All')
  const [sort, setSort] = React.useState('')
  const [language, setLanguage] = React.useState('')
  
  // поисковик
  React.useEffect(() => {
    const findArr = repos.filter(item => item.name.toLowerCase().includes(inputVal.toLowerCase()))
    setCopy(findArr)
  }, [inputVal])

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
  
  // чтобы узнать какой метод сортировки выбран
  React.useEffect(() => {
    if(filter === 'type'){
      if(change === 'Forks'){
        const typeArr = repos.filter(item => item.fork === true )
        setCopy(typeArr)
      }else if(change === 'Archived'){
        const typeArr = repos.filter(item => item.archived === true )
        setCopy(typeArr)
      }else if(change === 'Mirrors'){
        const typeArr = repos.filter(item => item.mirror_url !== null)
        setCopy(typeArr)
      }else if(change === 'All'){
        setCopy(repos)
      }
    }else if(filter === 'language'){
      const langArr = repos.filter(item => item.language === language)
      setCopy(langArr)
    }else if(filter === 'sort'){
      if(sort === 'Name'){
        const sortArr = repos.sort()
        setCopy(sortArr)
      }else if(sort === 'Stars'){
        const sortArr = repos.filter(item => item.stargazers_count > 1)
        console.log(sortArr)
        setCopy(sortArr)
      }
    }
  }, [change,sort,language])
  
  

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
          change={language}
        />
      }
      <div className="repo__input">
        <input type="text" placeholder='Find a repository' onInput={e => setInputVal(e.target.value)}/>
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
