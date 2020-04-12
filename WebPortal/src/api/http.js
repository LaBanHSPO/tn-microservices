import axios from 'axios';
import { appConfig } from 'config';
import { get } from 'lodash';
import ServicesNames from 'app-constants/service.names';

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

  configureResponse = ({ doDisplayErrors, doLogout }) => {
    this.client.interceptors.response.use(
      async (response) => {
        return response;
      },
      (error) => {
        const errorResponse = get(error, 'response.data', error.errorResponse);
        const code =
          errorResponse.code ||
          errorResponse.statusCode ||
          errorResponse.status;
        const message = errorResponse.error || error.message;
        const url = get(error, 'config.url', error.url);
        if (
          [401].includes(code) &&
          ![ServicesNames.AUTH_LOGIN, ServicesNames.AUTH_LOGIN_LOG].includes(
            url
          )
        ) {
          doLogout();
        } else {
          doDisplayErrors({
            code,
            message: message
          });
        }
        return Promise.reject(error);
      }
    );
  };
}

export default new Http();
