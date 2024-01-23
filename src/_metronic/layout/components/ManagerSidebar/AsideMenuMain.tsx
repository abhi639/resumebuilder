/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  const menuItemStyle = {
    fontSize: '18px', // Adjust the font size as needed
  }

  return (
    <>
      <div className='your-menu-item-class' style={menuItemStyle}>
        <AsideMenuItem
          to='/managerdashboard'
          icon='/media/icons/duotune/art/art002.svg'
          // title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
          title='My Resume'
          fontIcon='bi-app-indicator'
        />
      </div>
      <div className='your-menu-item-class' style={menuItemStyle}>
        <AsideMenuItem
          to='/Downloadhistory'
          icon='/media/icons/duotune/general/gen019.svg'
          title='Download history'
          fontIcon='bi-layers'
        />
      </div>

      <div className='your-menu-item-class' style={menuItemStyle}>
        <AsideMenuItem
          to='/activityHistory'
          title='Activity history'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
        />
      </div>

      <AsideMenuItemWithSub to='/crafted/pages/profile' title='Manager' hasBullet={false}>
        <div className='your-menu-item-class' style={menuItemStyle}>
          <AsideMenuItem
            to='/allEmployee'
            title='Employee(s)'
            // fontIcon='bi-sticky'
            icon='/media/icons/duotune/general/gen040.svg'
          />
        </div>
        <div className='your-menu-item-class' style={menuItemStyle}>
          <AsideMenuItem
            to='/allProject'
            title='Project(s)'
            // fontIcon='bi-sticky'
            icon='/media/icons/duotune/general/gen040.svg'
          />
        </div>

        <div className='your-menu-item-class' style={menuItemStyle}>
          <AsideMenuItem
            to='/teamActivity'
            title='Team Activity'
            // fontIcon='bi-sticky'
            icon='/media/icons/duotune/general/gen040.svg'
          />
        </div>
      </AsideMenuItemWithSub>
    </>
  )
}
