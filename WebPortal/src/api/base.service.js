import http from './http';

export class CollectionService {
  serviceName;
  client;
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.client = http.client;
  }
  find = (params) => this.client.get(this.serviceName, params);
  get = (id, params) =>
    this.client.get(`${this.serviceName}/${id}`, params);
  create = (payload) =>
    this.client.post(this.serviceName, payload, params);
  delete = (id, params) =>
    this.client.delete(`${this.serviceName}/${id}`, params);
  update = (id, data, params) =>
    this.client.put(`${this.serviceName}/${id}`, data, params);
  patch = (id, params) =>
    this.client.patch(`${this.serviceName}/${id}`, data, params);
  fakeApi = (
    serviceInfo,
    response = {},
    error,
    delayInSeconds = 3
  )=>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!error) {
          console.log('Success %o', serviceInfo);
          resolve(response);
        } else reject(error);
      }, delayInSeconds * 1000);
    });
}
