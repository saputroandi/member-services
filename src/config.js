const dotenv = require("dotenv");
dotenv.config();

class Config {
  SECRET_KEY;
  DB_HOST;
  DB_DIALECT;
  DB_NAME;
  DB_USERNAME;
  DB_PASSWORD;

  constructor() {
    this._getConfiguration();
  }

  _getConfiguration() {
    this.SECRET_KEY = process.env.SECRET_KEY;
    this.DB_HOST = process.env.DB_HOST;
    this.DB_DIALECT = process.env.DB_DIALECT;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_USERNAME = process.env.DB_USERNAME;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
  }
}

module.exports = new Config();
