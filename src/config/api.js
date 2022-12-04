import axios from "axios";


export const api = {
  getUser: (username) => axios.get(`/users/${username}`),
  getRepos: (username) => axios.get(`/users/${username}/repos`),
  reposFilter: (username, type, lang, sort) => axios.get(`/users/${username}?q=&sort=${sort}`),
  findUser: (query) => axios.get(`/search/repositories?q=${query}{&page,per_page,sort,order}`)
}