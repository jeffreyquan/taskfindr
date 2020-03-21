const { DB_HOST, DB_PASS } = process.env;

module.exports = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  username: 'postgres',
  
}