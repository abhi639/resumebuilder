import React from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const ForgetpasswordError = () => {
  const divStyle = {
    backgroundImage: `url(${toAbsoluteUrl('/media/gif/ForgetPasswordError.gif')})`,
    backgroundSize: 'cover', // or 'contain' depending on your preference
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '400px',
  }

  return (
    <section className='page_404'>
      <div className='col-sm-12 '>
        <div className='text-center'>
          <div className='contant_box_404' style={divStyle}>
            <div className='four_zero_four_bg'>
              <h1 className='text-center'>404</h1>
            </div>
            <h3 className='h2'>Oops! Token expired.</h3>
            <div style={{marginTop: '60%'}}>
              <p>Please click below to send the verification token again.</p>
              <Link to='/auth/forgot-password' className='btn btn-primary link_404'>
                Go to forgot password page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgetpasswordError
