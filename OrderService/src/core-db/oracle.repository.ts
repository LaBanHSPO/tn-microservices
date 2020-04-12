import {Inject, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const oracledb = require('oracledb');


@Injectable()
export class OracleRepository {
  constructor(
  @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const dbConfig = this.configService.get('oracleDbConfig');
    const t1 = Date.now();
    oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
      poolMax: dbConfig.poolMax,
      poolMin:  dbConfig.poolMin,
      poolIncrement: dbConfig.poolIncrement,
      queueTimeout: dbConfig.queueTimeout,
      poolTimeout: dbConfig.poolTimeout,
      poolPingInterval: dbConfig.poolPingInterval,
      queueMax: dbConfig.queueMax,
      _enableStats: true,
      // edition: 'ORA$BASE', // used for Edition Based Redefintion
      // events: false, // whether to handle Oracle Database FAN and RLB events or support CQN
      // externalAuth: false, // whether connections should be established using External Authentication
      // homogeneous: true, // all connections in the pool have the same credentials
      // poolAlias: 'default', // set an alias to allow access to the pool via a name.
      // sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
      // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
    }).then((pool) => {
      const t2 = Date.now();
      console.log('\nConnected to OracleDB. Connection pool started.');
      console.log(`Opened ${pool.connectionsOpen}/${dbConfig.poolMax} connections. Current in use:  ${pool.connectionsInUse} connections. (${(t2 - t1) / 1000} seconds)\n`);
    }).catch(err => {
      console.error(err);
      process.exit(1);
    });

    process
        .once('SIGTERM', () => this.closePoolAndExit(true))
        .once('SIGINT',  () => this.closePoolAndExit(true));
  }

  async getConnection() {
    return oracledb.getConnection();
  }

  async doExecute(sql: string, params: object = [], options?: object): Promise<any> {
    let connection;
    try {
      // Get a connection from the default pool
      connection = await this.getConnection();
      const defaultOptions = { outFormat: oracledb.OUT_FORMAT_OBJECT };
      const result = await connection.execute(sql, params, options || defaultOptions);
      return result;
    } catch (err) {
      console.log("doExecute > sql: ", sql);
      console.log("doExecute > params: ", params);
      console.log("ERROR: From doExecute: ", err);
      throw err;
    } finally {
      if (connection) {
        try {
          // Put the connection back in the pool
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async doExecuteCommand(connection, sql: string, params: object = [], options?: object): Promise<any> {
    try {
      // Get a connection from the default pool
      connection = await this.getConnection();
      const defaultOptions = { outFormat: oracledb.OUT_FORMAT_OBJECT };
      const result = await connection.execute(sql, params, options || defaultOptions);
      return result;
    } catch (err) {
      console.log("doExecute > sql: ", sql);
      console.log("doExecute > params: ", params);
      console.log("ERROR: From doExecute: ", err);
      await connection.close();
      throw err;
    }
  }

  doRelease = async (connection) => {
    try {
      await connection.close();
    } catch (err) {
      throw err;
    }
  };

  doCommit = async (connection) => {
    try {
      await connection.commit();
    } catch (err) {
      throw err;
    }
  };

  doRollback = async (connection) => {
    try {
      await connection.rollback();
    } catch (err) {
      throw err;
    }
  };

  async closePoolAndExit(shouldExit= true) {
    console.log('\nOracle Connection Pool is terminating');
    try {
      // Get the pool from the pool cache and close it when no
      // connections are in use, or force it closed after 10 seconds
      // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file
      await oracledb.getPool().close(10);
      console.log('\nOracleDB Connection Pool closed.');
      shouldExit && process.exit(0);
    } catch(err) {
      console.error(err.message);
      shouldExit && process.exit(1);
    }
  }


}
