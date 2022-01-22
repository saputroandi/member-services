const dotenv = require("dotenv");
dotenv.config();

class Config {
  SECRET_KEY;
  MESSAGE_BROKER_HOST;
  DB_HOST;
  DB_NAME;
  DB_USERNAME;
  DB_PASSWORD;

  constructor() {
    this._getConfiguration();
  }

  _getConfiguration() {
    this.SECRET_KEY = process.env.SECRET_KEY;
    this.MESSAGE_BROKER_HOST = process.env.MESSAGE_BROKER_HOST;
    this.APP_PORT = process.env.APP_PORT;
    this.DB_HOST = process.env.DB_HOST;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_USERNAME = process.env.DB_USERNAME;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
  }
}

module.exports = new Config();
