const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Boombeach@6",
  host: "localhost",
  port: 5432,
  database: "jobtrackerdb",
});

module.exports = pool;
