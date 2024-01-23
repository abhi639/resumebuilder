
import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'

import {MenuTestPage} from '../pages/MenuTestPage'

import Allemployee from '../../Screens/App/Admin/Employee/Allemployee'

import Bulkupload from '../../Components/BulkUpload'

import AllProject from '../../Screens/App/Manager/Project/Allproject'
import {EmployeeMasterLayout} from '../../_metronic/layout/EmployeeMasterLayout'
import ActivityHistory from '../../Screens/App/Employee/Activityhistory'
import EmployeeDashboardPage from '../pages/Empoyeedashboard/EmployeeDashboardPage'
const EmployeeDashboard = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/MasterData'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  console.log('Employee Dashboard')
  return (
    <EmployeeMasterLayout>
      <Suspense fallback={<FallbackView />}>
        <Switch>
          <Route path='/dashboard' component={EmployeeDashboardPage} />
          <Route path='/builder' component={BuilderPageWrapper} />
          <Route path='/crafted/pages/profile' component={ProfilePage} />
          <Route path='/crafted/pages/wizards' component={WizardsPage} />
          <Route path='/crafted/widgets' component={WidgetsPage} />
          <Route path='/crafted/account' component={AccountPage} />
          <Route path='/apps/chat' component={ChatPage} />
          <Route path='/menu-test' component={MenuTestPage} />
          <Route path='/allEmployee' component={Allemployee} />
          <Route path='/activityHistory' component={ActivityHistory} />
          <Route path='/bulk-upload' component={Bulkupload} />
          <Route path='/allProject' component={AllProject} />
          <Redirect from='/auth' to='/employee' />
          <Redirect exact from='/' to='/dashboard' />
          <Redirect to='error/404' />
        </Switch>
      </Suspense>
    </EmployeeMasterLayout>
  )
}

export default EmployeeDashboard
