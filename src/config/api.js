import axios from "axios";


export const api = {
  getUser: (username) => axios.get(`/users/${username}`),
  getRepos: (username) => axios.get(`/users/${username}/repos`),
  reposFilter: (username, type, lang, sort) => axios.get(`/users/${username}?q=sort=${sort}`),
  findUser: (username) => axios.get(`/search/users?q=${username}`),
}