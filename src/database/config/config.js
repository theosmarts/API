require("dotenv").config();

module.exports = {
  development: {
    server: process.env.SERVER,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.SERVER,
    dialect: process.env.DBTYPE,
    node_env: process.env.NODE_ENV
  },
  test: {
    server: "localhost",
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.SERVER,
    dialect: process.env.DBTYPE,
    node_env: process.env.NODE_ENV
  },
  production: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.SERVER,
    dialect: process.env.DBTYPE,
    node_env: process.env.NODE_ENV
  }
};
