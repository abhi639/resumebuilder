import axios from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}auth/user`
export const LOGIN_URL = `${API_URL}auth/signin`
export const REGISTER_URL = `${API_URL}auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}auth/forgotPassword/request`
export const LOGOUT = `${API_URL}auth/logout`

// Server should return AuthModel
export function login(username: string, password: string) {
  // console.log(username,password);
  // console.log(LOGIN_URL);
  // console.log(axios.post(LOGIN_URL, {username, password}))
  return axios.post(LOGIN_URL, {username, password})
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  const urlWithParams = `${REQUEST_PASSWORD_URL}?email=${email}`
  console.log(urlWithParams)
  return axios.post<{result: boolean}>(urlWithParams)
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}

export function logout() {
  return axios.post(LOGOUT)
}
