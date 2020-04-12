import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  isProduction    : process.env.NODE_ENV === 'production',
  cacheTtl        : 5000,
  redisHost       : process.env.REDIS_HOST,
  redisPort       : process.env.REDIS_PORT,
  redisPass       : process.env.REDIS_PASSWORD,
  graphqlConfig   : {
    autoSchemaFile  : 'schema.gql',
    installSubscriptionHandlers: true,
    path: '/graphql',
    disableHealthCheck: true,
    context: ({ req, res, connection }) => ({ req, res, connection }),
    tracing: process.env.NODE_ENV === 'development',
    debug:  process.env.NODE_ENV === 'development',
  }
}));
