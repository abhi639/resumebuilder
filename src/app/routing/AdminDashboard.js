import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/Admindashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import AddEmp from '../../Components/AddEmployee'
import Allhistory from '../../Screens/App/Admin/Activityhistory/AllHistory'
import Bulkupload from '../../Components/BulkUpload'
import {AdminMasterLayout} from '../../_metronic/layout/AdminMasterLayout'
import RolesBulkupload from '../../Components/RolesBulkUpload'
import TechnologyBulkupload from '../../Components/TechnologyBulkpload'
import EditEmployee from '../../Components/EditEmployee'
import Addtemplate from '../../Screens/App/Admin/Resumetemplate/Addtemplate'
import Mainresume from '../../Screens/App/Admin/Resumetemplate/Mainresume'
import EditResumeTemplate from '../../Screens/App/Admin/Resumetemplate/EditResumeTemplate'
import editProjectMaster from '../../Store/App/Manager/editProjectMaster'

const AdminDashboard = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/MasterData'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  return (
    <AdminMasterLayout>
      <Suspense fallback={<FallbackView />}>
        <Switch>
          <Route path='/dashboard' component={DashboardWrapper} />
          <Route path='/builder' component={BuilderPageWrapper} />
          <Route path='/crafted/pages/profile' component={ProfilePage} />
          <Route path='/crafted/pages/wizards' component={WizardsPage} />
          <Route path='/crafted/widgets' component={WidgetsPage} />
          <Route path='/crafted/account' component={AccountPage} />
          <Route path='/apps/chat' component={ChatPage} />
          <Route path='/menu-test' component={MenuTestPage} />
          <Route path='/add-employee' component={AddEmp} />
          <Route path='/activityHistory' component={Allhistory} />
          <Route path='/bulk-upload' component={Bulkupload} />
          <Route path='/addtemplate' component={Addtemplate} />
          <Route path='/editemp/:userId' component={EditEmployee} />
          <Route path='/editpro/:userId' component={editProjectMaster} />
        
          <Route path='/create-template' component={Mainresume} />
          <Route path='/editTemplate' component={EditResumeTemplate} />
          <Route path='/uploadroles' component={RolesBulkupload} />
          <Route path='/uploadtech' component={TechnologyBulkupload} />
          <Redirect from='/auth' to='/employee' />
          <Redirect exact from='/' to='/dashboard' />
          <Redirect to='error/404' />
        </Switch>
      </Suspense>
    </AdminMasterLayout>
  )
}

export default AdminDashboard
