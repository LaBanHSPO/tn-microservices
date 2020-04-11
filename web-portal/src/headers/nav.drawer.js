import React, { Component } from 'react';

import {
  EuiNavDrawer,
  EuiNavDrawerGroup,
  EuiHeaderSectionItemButton,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  EuiImage,
  EuiHorizontalRule
} from '@elastic/eui';

export default class extends Component {
  constructor(props) {
    super(props);

    const faveExtraAction = {
      color: 'subdued',
      iconType: 'starEmpty',
      iconSize: 's',
      'aria-label': 'Add to favorites'
    };

    const pinExtraAction = {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's'
    };

    const pinExtraActionFn = (val) => {
      pinExtraAction['aria-label'] = `Pin ${val} to top`;
      return pinExtraAction;
    };

    this.topLinks = [
      {
        label: 'Lịch sử gần đây',
        iconType: 'clock',
        flyoutMenu: {
          title: 'Recent items',
          listItems: [
            {
              label: 'My dashboard',
              href: '#/layout/nav-drawer',
              iconType: 'dashboardApp',
              extraAction: faveExtraAction
            },
            {
              label: 'Workpad with title that wraps',
              href: '#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: faveExtraAction
            },
            {
              label: 'My logs',
              href: '#/layout/nav-drawer',
              iconType: 'logsApp',
              'aria-label': 'This is an alternate aria-label',
              extraAction: faveExtraAction
            }
          ]
        }
      },
      {
        label: 'Yêu thích',
        iconType: 'starEmpty',
        flyoutMenu: {
          title: 'Favorite items',
          listItems: [
            {
              label: 'My workpad',
              href: '#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starFilled',
                iconSize: 's',
                'aria-label': 'Remove from favorites',
                alwaysShow: true
              }
            },
            {
              label: 'My logs',
              href: '#/layout/nav-drawer',
              iconType: 'logsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starFilled',
                iconSize: 's',
                'aria-label': 'Remove from favorites',
                alwaysShow: true
              }
            }
          ]
        }
      }
    ];

    this.adminLinks = [
      {
        label: 'Admin',
        iconType: 'managementApp',
        flyoutMenu: {
          title: 'Tools and settings',
          listItems: [
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'devToolsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add to Tools and Settings to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'monitoringApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Stack Monitoring to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'managementApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Stack Management to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              extraAction: { ...pinExtraActionFn('Nature Plugin') },
              icon: (
                <EuiImage
                  size="s"
                  alt="Random nature image"
                  url="https://source.unsplash.com/300x300/?Nature"
                />
              )
            }
          ]
        }
      }
    ];

    this.analyzeLinks = [
    ];

    this.securityLinks = [
      {
        label: 'Biểu đồ kinh doanh',
        iconType: 'logoSecurity',
        flyoutMenu: {
          title: 'SAMPLE',
          listItems: [
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'securityApp',
              extraAction: { ...pinExtraActionFn('SIEM') }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'securityAnalyticsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add SIEM to favorites'
              }
            }
          ]
        }
      }
    ];

    this.searchLinks = [
      {
        label: 'VTLOG',
        iconType: 'logoAppSearch',
        flyoutMenu: {
          title: 'SAMPLE',
          listItems: [
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'searchProfilerApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Enterprise search to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'searchProfilerApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add App Search to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'searchProfilerApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Workplace Search to favorites'
              }
            }
          ]
        }
      }
    ];

    this.observabilityLinks = [
      {
        label: 'P.CNTT',
        iconType: 'logoMetrics',
        flyoutMenu: {
          title: 'SAMPLE',
          listItems: [
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'logsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Logs to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'metricsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Metrics to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'apmApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add APM to favorites'
              }
            },
            {
              label: 'SAMPLE',
              href: '#/layout/nav-drawer',
              iconType: 'uptimeApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Uptime to favorites'
              }
            }
          ]
        }
      }
    ];
  }

  renderLogo() {
    return (
      <EuiHeaderLogo
        iconType="logoKibana"
        href="#/layout/nav-drawer"
        aria-label="Goes to home"
      />
    );
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={this.props.toggleOpenDrawer}
      >
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
          console.log('You clicked management');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass'
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
          console.log('You clicked truncation test');
        }
      },
      {
        text: 'hidden',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
          console.log('You clicked hidden');
        }
      },
      {
        text: 'Users',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
          console.log('You clicked users');
        }
      },
      {
        text: 'Create'
      }
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  setNavDrawerRef = (ref) => (this.navDrawerRef = ref);

  render() {
    return (
      <EuiNavDrawer ref={this.setNavDrawerRef} isLocked={false}>
        {/*<EuiNavDrawerGroup listItems={this.topLinks} />*/}
        <EuiHorizontalRule margin="none" />
        <EuiNavDrawerGroup listItems={this.analyzeLinks} />
        <EuiNavDrawerGroup listItems={this.securityLinks} />
        <EuiNavDrawerGroup listItems={this.searchLinks} />
        <EuiNavDrawerGroup listItems={this.observabilityLinks} />
        <EuiHorizontalRule margin="none" />
        <EuiNavDrawerGroup listItems={this.adminLinks} />
      </EuiNavDrawer>
    );
  }
}
