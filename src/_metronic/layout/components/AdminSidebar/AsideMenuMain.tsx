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
          to='/dashboard'
          icon='/media/icons/duotune/art/art002.svg'
          // title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
          title='Employees'
          fontIcon='bi-app-indicator'
        />
      </div>
      <div className='your-menu-item-class' style={menuItemStyle}>
        <AsideMenuItem
          to='/builder'
          icon='/media/icons/duotune/general/gen019.svg'
          title='Master Data'
          fontIcon='bi-layers'
        />
      </div>

      <div className='your-menu-item-class' style={menuItemStyle}>
        {/* <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub> */}
        <AsideMenuItem
          to='/addtemplate'
          title='Templates'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
        />
      </div>
      <div className='your-menu-item-class' style={menuItemStyle}>
        <AsideMenuItem
          to='/activityHistory'
          title='Activity History'
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/general/gen040.svg'
        />
      </div>
    </>
  )
}
