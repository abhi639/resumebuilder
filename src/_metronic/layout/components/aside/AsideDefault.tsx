/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useLayout } from '../../core';
import { KTSVG, toAbsoluteUrl } from '../../../helpers';
import { AsideMenu } from './AsideMenu';

const AsideDefault: FC = () => {
  const { config, classes } = useLayout();
  const { aside } = config;
  const [isAsideMinimized, setIsAsideMinimized] = useState(false);

  const toggleAside = () => {
    setIsAsideMinimized(!isAsideMinimized);
  };

  return (
    <div
      id="kt_aside"
      className={clsx('aside', classes.aside.join(' '), {
        'aside-minimize': isAsideMinimized,
      })}
      data-kt-drawer="true"
      data-kt-drawer-name="aside"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_aside_mobile_toggle"
    >
      <div className='aside-logo flex-column-auto' id='kt_aside_logo' style={{ backgroundColor: 'white' }}>
        {aside.theme === 'dark' && (
          <Link to="/dashboard">
            <img
              alt="Logo"
              className="h-80px logo"
              src={toAbsoluteUrl('/media/logos/logo2.png')}
            />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to="/dashboard">
            <img
              alt="Logo"
              className="h-25px logo"
              src={toAbsoluteUrl('/media/logos/logo-1.svg')}
            />
          </Link>
        )}

        <div
          id="kt_aside_toggle"
          className="btn btn-icon w-auto px-0 btn-active-color-primary"
          data-kt-toggle="true"
          data-kt-toggle-state="active"
          data-kt-toggle-target="body"
          data-kt-toggle-name="aside-minimize"
          onClick={toggleAside}
        >
          <div style={{ cursor: 'pointer' }}>
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={`svg-icon-1 ${isAsideMinimized ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'aside-menu flex-column-fluid',
          isAsideMinimized && 'aside-menu-minimized'
        )}
      >
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>

      <div className="aside-footer flex-column-auto pt-5 pb-7 px-5" id="kt_aside_footer"></div>
    </div>
  );
};

export { AsideDefault };
