const { Sequelize } = require("sequelize");
const Config = require("../config");

class SequelizeConfig {
  _sequelize;
  _config;

  constructor() {
    this._config = Config;

    this._sequelize = new Sequelize(
      this._config.DB_NAME,
      this._config.DB_USERNAME,
      this._config.DB_PASSWORD,
      {
        host: this._config.DB_HOST,
        dialect: this._config.DB_DIALECT,
        logging: false,
      }
    );
  }

  getConnection() {
    return this._sequelize;
  }
}

module.exports = new SequelizeConfig().getConnection();
