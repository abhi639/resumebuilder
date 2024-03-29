/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import AdminDashboard from './AdminDashboard'
import ManagerDashboard from './ManagerDashboard'
import EmployeeDashboard from './EmployeeDashboard'

const Routes = () => {
  const isAuthorized = useSelector(({auth}) => auth.user)

  console.log('isAuthorized', isAuthorized)

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from='/auth' to='/' />
      )}

      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to='/auth/login' />
      ) : (
        <>
          {isAuthorized?.appRole?.name === 'ROLE_ADMIN' ? (
            <AdminDashboard />
          ) : isAuthorized?.appRole?.name === 'ROLE_MANAGER' ? (
            <ManagerDashboard />
          ) : isAuthorized?.appRole?.name === 'ROLE_USER' ? (
            <EmployeeDashboard />
          ) : (
            <Route path='/error' component={ErrorsPage} />
          )}
        </>
      )}
    </Switch>
  )
}

export {Routes}
