/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../core'
import { Link } from 'react-router-dom'
import Logo from "./Quadwave-Logo.png"
const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <img src={Logo} alt=""  height="25px" width="100px"/>
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1' >
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          <a href='#' className='text-gray-800 text-hover-primary'>
            Quadwave Consulting Pvt Ltd
          </a>
        </div>
        {/* end::Copyright */}

        {/* begin::Nav */}
        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <Link to='#' className='menu-link ps-0 pe-2'>
              About Us
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='#' className='menu-link pe-0 pe-2'>
              Contact Us
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='#' className='menu-link pe-0'>
              FeedBack
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='#' className='menu-link pe-0'>
              Terms And Conditions
            </Link>
          </li>
        </ul>
        {/* end::Nav */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
