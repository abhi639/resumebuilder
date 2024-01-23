/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'
import {useHistory, useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {is} from 'date-fns/locale'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const history = useHistory()
  const location = useLocation()

  const handleBulkUploadClick = () => {
    history.push('/bulk-upload')
  }

  const isDashboardPage = location.pathname === '/dashboard'
  const isResumeTemplatePage = location.pathname === '/addtemplate'
  const isAddproject = location.pathname === '/allProject'
  const isGeneratenew = location.pathname === '/Downloadhistory'
  const isAllEmployee= location.pathname === '/allEmployee'

  const handleAddNewProjectClick = () => {
    // Handle the click event for "Add New Project" button
    // You can navigate to the appropriate route or perform any other action
    console.log('Add New Project button clicked')
  }

  return (
    <div className='toolbar' id='kt_toolbar'>
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        <div className='d-flex align-items-center py-1'>
          <div className='me-4'>
            {(isDashboardPage|| isAllEmployee) && (
              <>
                <Link
                  to='/add-employee'
                  className='btn btn-sm btn-flex btn-light btn-active-dark fw-bolder'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  Add Employee
                </Link>
              </>
            )}
          </div>

          {isResumeTemplatePage && (
            <>
              <Link to='/create-template'>
                <button
                  style={{
                    cursor: 'pointer',
                    color: '#fff',
                    border: '3px solid #000',
                    padding: '10px',
                    borderRadius: '0 5px 5px 0',
                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                    width: '143px',
                    height: '42px',
                  }}
                >
                  Add Template
                </button>
              </Link>
            </>
          )}

          {(isDashboardPage|| isAllEmployee) && (
            <Link
              to='/bulk-upload'
              className='btn btn-sm btn-dark'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              id='kt_toolbar_primary_button'
            >
              Bulk Upload
            </Link>
          )}

          {/* Add New Project Button */}
          {isAddproject && (
            <Link
              to='/addproject'
              className='btn btn-sm btn-dark'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              id='kt_toolbar_primary_button'
            >
              Add New Project
            </Link>
          )}

          {isGeneratenew && (
            <Link
              to='/managerdashboard'
              className='btn btn-sm btn-dark'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              id='kt_toolbar_primary_button'
            >
              Generate New
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export {Toolbar1}
