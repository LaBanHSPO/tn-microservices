import axios from 'axios';
import { appConfig } from '../config/common';
import { get } from 'lodash';

class Http {
  client;

  constructor() {
    this.client = axios.create({
      baseURL: appConfig.backend_url,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  configureRequest = ({ accessToken }) => {
    this.client.interceptors.request.use(
      (config) => {
        config.headers = {
          authorization: 'Bearer '.concat(accessToken)
        };
        return config;
      },
      (error) => Promise.reject(error)
    );
  };

}

export default new Http();
