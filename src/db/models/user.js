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
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        // is_email: (email) => {
        //   const regex =
        //     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        //   const result = String(email).toLowerCase().match(regex);

        //   if (!result) throw new ValidationError("email not valid");
        // },
        // is_unique: async (value) => {
        //   const email = await User.findOne({
        //     where: {
        //       email: value,
        //     },
        //   })
        //   if (email) throw new ValidationError("email has been taken")
        // },
        // },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [6, 16],
        // },
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
        },
      },
    }
  );
  return User;
};
