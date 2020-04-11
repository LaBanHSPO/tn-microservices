import { SubscriptionClient } from 'subscriptions-transport-ws';
import { appConfig } from '../config/common';
import { noop } from 'lodash';

class GraphSub {
  client;
  accessToken;

  setupConnection = ({ accessToken }) => {
    this.accessToken = accessToken;
  };

  startConnection = () =>
    new Promise((resolve, reject) => {
      const subscriptionClient = new SubscriptionClient(
        appConfig.graphql_ws_endpoint,
        {
          reconnect: true,
          connectionParams: {
            accessToken: this.accessToken
          }
        }
      );
      subscriptionClient.onConnected((con) => {
        this.client = subscriptionClient;
        resolve();
      });
      subscriptionClient.onError((error) => {
        reject(error);
      });
      subscriptionClient.onReconnecting(() => {
        console.info('subscriptionClient is reconnecting');
      });
      subscriptionClient.onReconnected(() => {
        console.info('subscriptionClient is reconnected');
      });
    });

  doSubscribe = async ({ query }, onNext, onError) => {
    if (!this.client) {
      await this.startConnection();
    }
    this.client
      .request({
        query,
        variables: {}
      })
      .subscribe({
        next: onNext || noop,
        error: onError || noop,
        complete: () => {
          console.info('Subscription has been completed!');
        }
      });
  };
}

const graphSub = new GraphSub();
export default graphSub;
