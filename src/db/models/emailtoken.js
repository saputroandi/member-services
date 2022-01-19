"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmailToken.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  EmailToken.init(
    {
      token: DataTypes.STRING,
      user_id: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: "EmailToken",
      tableName: "email_tokens",
      timestamps: false,
    }
  );
  return EmailToken;
};
