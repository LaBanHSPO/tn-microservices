
import React, { Component, Fragment } from 'react';
import { first, get } from 'lodash';
import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiButton
} from '@elastic/eui';
import OrdersService from "../../api/orders.service";

export class OrderUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      large: true,
      fileContent: '',
      message: ''
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
              <p>{this.state.fileContent}</p>
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

  handleSubmitOrderFile = async () => {
    try {
      if (!this.state.fileContent) return alert('Noop');
      const orders = [];
      const rows = String(this.state.fileContent).split('\n');
      const headers = rows[0];
      for (let i = 1; i < rows.length; i++) {
        orders.push({
          ORDER_ID: rows[i].split(',')[0],
          PRODUCT_ID: rows[i].split(',')[1],
          QUANTITY: rows[i].split(',')[2],
        })
      }
      console.log('Ket qua parse file csv: ',orders);
      // call api create orders
      // URL: /orders
      const response = await OrdersService.create({ orderList: orders });
      const message = get(response, 'data.orders', []).map(orderResponse => {
        return `${orderResponse.ORDER_ID} - ${orderResponse.STATUS}`
      }).join(' | ');
      this.setState({ message });
    } catch (err) {
      console.error(err);
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
          <EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                iconType="arrowDown"
                onClick={this.handleSubmitOrderFile}>
                Tải lên
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              {this.state.message}
            </EuiFlexItem>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}