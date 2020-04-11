import { appConfig } from 'config';
import http from './http';

class GraphQLClient {
  endpoint;
  constructor(props) {
    this.endpoint = props.endpoint;
  }

  query({ query, variables }) {
    return http.client
      .post(this.endpoint, { query, variables })
      .then((r) => r.data);
  }
  mutate({ mutation, variables }) {
    return http.client
      .post(this.endpoint, { query: mutation, variables })
      .then((r) => r.data);
  }
}
export default new GraphQLClient({
  endpoint: appConfig.graphql_endpoint
});
