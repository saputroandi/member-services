const { DataTypes, ValidationError } = require("sequelize");
const sequelize = require("../db/db-config");
const bcrypt = require("bcrypt");

class User {
  _sequelize;

  constructor() {
    this._sequelize = sequelize;
  }

  define() {
    const userModel = this._sequelize.define(
      "user",
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is_email: (email) => {
              const regex =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              const result = String(email).toLowerCase().match(regex);

              if (!result) throw new ValidationError("email not valid");
            },
            is_unique: async (value) => {
              const email = await userModel.findOne({
                where: {
                  email: value,
                },
              });
              if (email) throw new ValidationError("email has been taken");
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 16],
          },
        },
        is_verified: {
          type: DataTypes.TINYINT,
          defaultValue: 0,
        },
      },
      {
        underscored: true,
        timestamps: false,
        hooks: {
          beforeCreate(user, options) {
            user.password = bcrypt.hashSync(user.password, 10);
          },
          afterCreate(response) {
            delete response.dataValues.password;
            delete response.dataValues.updatedAt;
            delete response.dataValues.createdAt;
          },
        },
      }
    );

    return userModel;
  }
}

module.exports = new User().define();
