import React from 'react';
import {
  EuiFlexGroup,
  EuiPage,
  EuiPageBody,
  EuiTabbedContent,
  EuiFocusTrap,
  EuiIcon,
} from '@elastic/eui';
import { Layout } from 'antd';
import '@elastic/eui/dist/eui_theme_amsterdam_light.min.css';
import { appConfig } from './config/common';
import LoginPage from './pages/login';
import { OrderUpload } from './pages/order';

// import AppHeader from './app.header';
import NavDrawer from './headers/nav.drawer';


const AppLayout = () => {
  const tabList = [
    {
      id: 'login',
      name: 'Đăng nhập',
      disabled: false,
      content: <LoginPage/>,
    },
    {
      id: 'create-order',
      name: 'Tạo đơn hàng',
      content: <OrderUpload/>,
      disabled: false,
    },
    {
      id: 'list-inv',
      name: (
        <span>
          <EuiIcon type="heatmap" />
          &nbsp;Xem tồn kho
        </span>
      ),
      disabled: true,
    }
  ];

  return (
    <EuiFlexGroup responsive={true}>
      <EuiFocusTrap>
        <div className="page-wrapper">
          {/* <AppHeader /> */}
          <NavDrawer />
          <EuiPage className="euiNavDrawerPage">
            <EuiPageBody className="euiNavDrawerPage__pageBody">
              <EuiTabbedContent size="m" tabs={tabList}/>
              {/* <EuiPageContent>
                <EuiPageContentBody>
                </EuiPageContentBody>
              </EuiPageContent> */}
            </EuiPageBody>
          </EuiPage>
        </div>
      </EuiFocusTrap>
      <Layout.Footer className="app-footer">{appConfig.footer}</Layout.Footer>
    </EuiFlexGroup>
  );
};

export default AppLayout;
