import React, {useEffect, useRef, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {resetForgetPassword} from '../../../../Store/App/Common/resetForgetPassword'
import {useHistory, useLocation} from 'react-router-dom'

const passwordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const ResetPassword = () => {
  const history = useHistory()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token') || ''

  const [passwordUpdateData, setPasswordUpdateData] = useState({
    newPassword: '',
    passwordConfirmation: '',
  })
  const [loading2, setLoading2] = useState(false)
  const dispatch = useDispatch()

  const isMounted = useRef(true) // Use a ref to track whether the component is mounted

  useEffect(() => {
    return () => {
      isMounted.current = false // Set isMounted to false when component unmounts
    }
  }, [])

  const formik2 = useFormik({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true)
      setTimeout(() => {
        // Dispatch the action with the form values
        dispatch(resetForgetPassword(token, values))
          .then(() => {
            // Check if the component is still mounted before updating the state
            if (isMounted.current) {
              // Redirect to the login page upon successful password reset
              history.push('/login')
            }
          })
          .finally(() => {
            // Check if the component is still mounted before updating the state
            if (isMounted.current) {
              setLoading2(false)
            }
          })
      }, 1000)
    },
  })

  return (
    <div>
      <div className='text-center mb-0'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Reset password</h1>
        {/* end::Title */}
      </div>

      <div className='card-body border-top p-9'>
        <form
          onSubmit={formik2.handleSubmit}
          id='kt_signin_change_password'
          className='form'
          noValidate
        >
          <div className='fv-row mb-4' style={{width: '50%'}}>
            <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
              New Password
            </label>
            <input
              type='password'
              className='form-control form-control-solid '
              id='newpassword'
              {...formik2.getFieldProps('newPassword')}
            />
            {formik2.touched.newPassword && formik2.errors.newPassword && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-danger'>{formik2.errors.newPassword}</div>
              </div>
            )}
          </div>

          <div className='fv-row mb-4' style={{width: '50%'}}>
            <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
              Confirm New Password
            </label>
            <input
              type='password'
              className='form-control form-control-solid '
              id='confirmpassword'
              {...formik2.getFieldProps('passwordConfirmation')}
            />
            {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-danger'>
                  {formik2.errors.passwordConfirmation}
                </div>
              </div>
            )}
          </div>

          <div className='form-text mb-5 '>
            Password must be at least 8 characters and contain symbols
          </div>

          <div className='d-flex' style={{width: '50%'}}>
            <button id='kt_password_submit' type='submit' className='btn btn-primary me-auto px-6'>
              {!loading2 ? (
                'Update Password'
              ) : (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <button
              onClick={() => {}}
              id='kt_password_cancel'
              type='button'
              className='btn btn-color-gray-400 btn-active-light-primary ms-auto px-6'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ResetPassword}
