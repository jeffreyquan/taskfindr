const { DB, DB_HOST, DB_PASS } = process.env;

module.exports = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  username: 'postgres',
  database: DB,
  password: DB_PASS,
  entities: [
    `${__dirname}/server/models/*.ts`
  ],
  migrations: [
    `${__dirname}/server/migrations/*.ts`
  ],
  logging: true,
}