import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/Managerdashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import AddEmp from '../../Components/AddEmployee'
import Allemployee from '../../Screens/App/Admin/Employee/Allemployee'
import Allhistory from '../../Screens/App/Manager/Activityhistory/AllHistory'
import Bulkupload from '../../Components/BulkUpload'
import {ManagerMasterLayout} from '../../_metronic/layout/ManagerMasterLayout'
import AllProject from '../../Screens/App/Manager/Project/Allproject'
import {ManagerDashboardWrapper} from '../pages/Managerdashboard/ManagerDashboardWrapper'
import Teamactivity from '../../Screens/App/Manager/Teamactivity'
import Downloadhistory from '../../Screens/App/Manager/Downloadhistory'
import Addproject from '../../Screens/App/Manager/Project/Addproject'
import EditEmployee from '../../Components/EditEmployee'
import AllProjects from '../../Screens/App/Manager/Project/Allproject'
import editProjectMaster from '../../Store/App/Manager/editProjectMaster'
import Editproject from '../../Screens/App/Manager/Project/Editproject'

const ManagerDashboard = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/MasterData'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  console.log('Manager Dashboard')
  return (
    <ManagerMasterLayout>
      <Suspense fallback={<FallbackView />}>
        <Switch>
          <Route path='/managerdashboard' component={ManagerDashboardWrapper} />
          <Route path='/builder' component={BuilderPageWrapper} />
          <Route path='/crafted/pages/profile' component={ProfilePage} />
          <Route path='/crafted/pages/wizards' component={WizardsPage} />
          <Route path='/crafted/widgets' component={WidgetsPage} />
          <Route path='/crafted/account' component={AccountPage} />
          <Route path='/apps/chat' component={ChatPage} />
          <Route path='/menu-test' component={MenuTestPage} />
          <Route path='/allEmployee' component={Allemployee} />
          <Route path='/activityHistory' component={Allhistory} />
          <Route path='/bulk-upload' component={Bulkupload} />
          <Route path='/allProject' component={AllProject} />
          <Route path='/teamActivity' component={Teamactivity} />
          <Route path='/Downloadhistory' component={Downloadhistory} />
          <Route path='/addproject' component={Addproject} />
          <Route path='/editemp/:userId' component={EditEmployee} />
          <Route path='/add-employee' component={AddEmp} />
          <Route path='/editpro/:projectId' component={Editproject} />
          <Redirect from='/auth' to='/employee' />
          <Redirect exact from='/' to='/managerdashboard' />
          <Redirect to='error/404' />
        </Switch>
      </Suspense>
    </ManagerMasterLayout>
  )
}

export default ManagerDashboard
