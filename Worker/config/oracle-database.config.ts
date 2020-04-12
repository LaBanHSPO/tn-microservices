import { registerAs } from '@nestjs/config';

export default registerAs('oracleDbConfig', () => ({
  user              : process.env.NODE_ORACLEDB_USER,
  password          : process.env.NODE_ORACLEDB_PASSWORD,
  connectString     : process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  poolMax           : parseInt(process.env.NODE_ORACLEDB_POOL_MAX),
  poolMin           : parseInt(process.env.NODE_ORACLEDB_POOL_MIN),
  poolIncrement     : parseInt(process.env.NODE_ORACLEDB_POOL_INCREMENT),
  queueTimeout      : parseInt(process.env.NODE_ORACLEDB_QUEUE_TIMEOUT),
  poolTimeout       : parseInt(process.env.NODE_ORACLEDB_POOL_TIMEOUT),
  poolPingInterval  : parseInt(process.env.NODE_ORACLEDB_POOL_PING_INTERVAL),
  queueMax          : parseInt(process.env.NODE_ORACLEDB_QUEUE_MAX)
}));
