"use strict";
const { Model, ValidationError } = require("sequelize");
const bcrypt = require("bcrypt");

const HASH_ROUND = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.EmailToken, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, HASH_ROUND);
        },
        afterCreate: (user, options) => {
          delete user.dataValues.password;
          delete user.dataValues.EmailToken;
        },
      },
    }
  );
  return User;
};
