import { createConnection, Connection } from 'typeorm';
import debug from 'debug';

const error = debug('database.service');
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB = process.env.DB || 'blue';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'postgres';

class DatabaseService {
  private connection: Connection;

  async initDB(sync = true): Promise<any> {
    try {
      const options: any = {
        type: 'postgres',
        host: DB_HOST,
        username: DB_USER,
        password: DB_PASS,
        port: DB_PORT,
        database: DB,
        logging: true,
      }

      if (sync) {
        options.synchronize = sync;
      }

      if (!this.connection) {
        this.connection = await createConnection(options);
      }
    } catch (e) {
      error(e.message);
      process.exit(1);
    }
  }
}

export default new DatabaseService();