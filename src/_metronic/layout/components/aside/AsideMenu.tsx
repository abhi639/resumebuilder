import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import clsx from 'clsx';
import { AsideMenuMain } from './AsideMenuMain';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ToggleComponent,
} from '../../../assets/ts/components';

type Props = {
  asideMenuCSSClasses: string[];
};

const AsideMenu: React.FC<Props> = ({ asideMenuCSSClasses }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(true); // Initially expanded

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
      ScrollComponent.reinitialization();
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      id="kt_aside_menu_wrapper"
      ref={scrollRef}
      className={clsx(
        'my-5 my-lg-5',
        isExpanded ? 'menu-expanded' : 'menu-collapsed'
      )}
    >
      <div
        id="kt_aside_menu"
        data-kt-menu="true"
        className={clsx(
          'menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500',
          asideMenuCSSClasses.join(' ')
        )}
        style={{ width: isExpanded ? '240px' : '60px' }} // Adjust the width accordingly
      >
        <AsideMenuMain />
      </div>
      <div
        className="arrow-button"
        onClick={toggleMenu}
      >
        {isExpanded ? (
          <span className="arrow-icon">▲</span>
        ) : (
          <span className="arrow-icon">▼</span>
        )}
      </div>
    </div>
  );
};

export { AsideMenu };
