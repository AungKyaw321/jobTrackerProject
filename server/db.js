const Pool = require("pg").Pool;

const pool = new Pool({
  user: "mwin",
  password: "password7117",
  host: "localhost",
  port: 5432,
  database: "jobtrackerdb",
});

module.exports = pool;

