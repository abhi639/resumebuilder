import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect, Switch} from 'react-router-dom'
import * as auth from './redux/AuthRedux'
import { logout } from '../../../Store/Auth/Login'

export function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
    document.location.reload()
  }, [dispatch])

  return (
    <Switch>
      <Redirect to='/auth/login' />
    </Switch>
  )
}
