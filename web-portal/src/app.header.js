import React from 'react';
import { EuiHeader, EuiFieldSearch, EuiHeaderLogo } from '@elastic/eui';
import HeaderUserMenu from './headers/header.user.menu';
import HeaderAppMenu from './headers/header.app.menu';
import HeaderSpacesMenu from './headers/header.spaces.menu';

const Header = () => {

  const breadcrumbs = [
    {
      text: 'ElasticUI',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
      'data-test-subj': 'breadcrumbsAnimals',
      className: 'customClass'
    },
    {
      text: 'Danh sách'
    }
  ];

  const renderSearch = (
    <EuiFieldSearch
      placeholder="Tìm kiếm ..."
      compressed={true}
      isClearable={true}
      fullWidth={true}
    />
  );

  const renderLogo = (
    <EuiHeaderLogo iconType="logoMaps" href="#" aria-label="Go to home page" />
  );

  const sections = [
    {
      items: [renderLogo, <HeaderSpacesMenu />],
      borders: 'right',
      breadcrumbs: breadcrumbs
    },
    {
      items: [renderSearch, <div style={{ width: 8 }} />],
      borders: 'none'
    },
    {
      items: [<HeaderUserMenu />, <HeaderAppMenu />]
    }
  ];

  return <EuiHeader sections={sections} />;
};

export default Header;
