const Pool = require('pg');
const config = require('../config');

const [user, host, database, password] = config;

const pool = new Pool({
  user,
  password,
  host,
  database,
});

export default pool;
