import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const signup = (user) => {
  return api.post('/signup', user).then(res => res.data);
};

export const login = (username, password) => {
  return api.post('/token', `username=${username}&password=${password}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(res => res.data);
};


export const getTags = () => {
  return api.get('/tags', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data);
};

export const createTag = (tag) => {
  return api.post('/tags', tag, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data);
};