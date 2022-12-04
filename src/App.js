import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import UserDetails from "./pages/UserDetails";
import Header from "./components/Header";
import React from "react";
axios.defaults.baseURL = 'https://api.github.com'

function App() {
  const [singleUser, setSingleUser] = React.useState('')
  
  return (
    <div className="App">
      <Header setUser={setSingleUser}/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path={'/user'} element={<UserDetails login={singleUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
