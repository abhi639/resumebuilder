import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router-dom'
import ComingSoon from '../../../Screens/Common/ComingSoon'

const ProfileHeader: React.FC = () => {
  const location = useLocation()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0 d-flex justify-content-center align-items-center'>
        {/* <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'> */}
              {/* Replace the existing SVG with your "coming soon" logo */}
              {/* <img
                src={process.env.PUBLIC_URL + '/media/icons/duotune/comingsoon.png'}
                alt='Coming Soon'
                style={{width: '150%', height: '150%', marginLeft: '64%', marginTop: '-24%'}}
              /> */}
              <ComingSoon/>
              {/* <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Metornic' /> */}
              {/* <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div> */}
            {/* </div>
          </div> */}
          {/* Rest of your code remains unchanged */}
          {/* ... */}
        {/* </div> */}
      </div>
    </div>
  )
}

export {ProfileHeader}
