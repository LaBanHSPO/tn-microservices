
import React, { Component, Fragment } from 'react';
import { first } from 'lodash';
import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
} from '@elastic/eui';

export class OrderUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      large: true,
      fileContent: ''
    };
  }

  onChange = files => {
    this.setState({
      files,
    });
    const file = first(files);
    if (!file) return;
    const reader = new FileReader()
    reader.onload = (evt) => {
      this.setState({ fileContent: evt.target.result });
    }
    reader.readAsText(file);
    reader.onerror = (err) => {
        alert(err);
    }
  };

  renderfile() {
    if (this.state.files.length) {
      return (
        <ul>
            {Object.keys(this.state.files).map((item, i) => (
              <li key={i}>
              <strong>{this.state.files[i].name}</strong>
              <p>{this.state.files[i].size} bytes</p>
              <p>{this.state.fileContent} bytes</p>
              </li>
            ))}
        </ul>
      );
    } else {
      return (
        <p>Bạn chưa chọn file</p>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <EuiFlexGroup>
          <EuiFlexItem grow={2}>
              <EuiFilePicker
                id="file-upload"
                multiple={false}
                accept=".csv"
                initialPromptText="Chọn file danh sách đơn hàng cần xuất kho"
                onChange={file => {
                  file && this.onChange(file);
                }}
                display={this.state.large ? 'large' : 'default'}
                aria-label="Use aria labels when no actual label is in use"
              />
            <EuiSpacer />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <h3>File</h3>
              {this.renderfile()}
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}