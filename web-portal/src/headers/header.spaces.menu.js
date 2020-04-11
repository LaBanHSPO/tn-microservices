import React, { Component } from 'react';
import {
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiAvatar,
  EuiSelectable,
  EuiPopoverTitle
} from '@elastic/eui';

class HeaderSpacesMenu extends Component {
  constructor(props) {
    super(props);

    this.spaces = [].map((menu) => ({
      label: menu.title,
      prepend: <EuiAvatar type="space" name={menu.title} size="s" />,
      onClick: () => {
        const { history } = this.props;
        history.replace(menu.path);
      },
      checked: 'on'
    }));

    this.state = {
      spaces: this.spaces,
      selectedSpace: this.spaces.filter((option) => option.checked)[0],
      isOpen: false
    };
  }

  isListExtended = () => {
    return this.state.spaces.length > 4;
  };

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  closePopover = () => {
    this.setState({
      isOpen: false
    });
  };

  onChange = (options) => {
    this.setState({
      spaces: options,
      selectedSpace: options.filter((option) => option.checked)[0],
      isOpen: false
    });
  };

  render() {
    const { selectedSpace, isOpen, spaces } = this.state;
    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="headerSpacesMenuList"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Apps menu"
        onClick={this.onMenuButtonClick}
      >
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id="headerSpacesMenu"
        ownFocus
        button={button}
        isOpen={isOpen}
        anchorPosition="downLeft"
        closePopover={this.closePopover}
        panelPaddingSize="none"
      >
        <EuiSelectable
          searchable={this.isListExtended()}
          searchProps={{
            placeholder: 'Find a space',
            compressed: true
          }}
          options={spaces}
          singleSelection="always"
          style={{ width: 300 }}
          onChange={this.onChange}
          listProps={{
            rowHeight: 40,
            showIcons: false
          }}
        >
          {(list, search) => (
            <>
              <EuiPopoverTitle>{search || 'Your spaces'}</EuiPopoverTitle>
              {list}
            </>
          )}
        </EuiSelectable>
      </EuiPopover>
    );
  }
}

export default HeaderSpacesMenu;
