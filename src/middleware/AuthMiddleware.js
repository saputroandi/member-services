const { checkSchema } = require("express-validator");

class AuthMiddleware {
  _userRepository;

  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  registrationMiddleware() {
    return checkSchema({
      email: {
        in: ["body"],
        isString: {
          errorMessage: "its supposed to be string",
        },
        notEmpty: {
          errorMessage: "its not supposed to be empty",
          options: {
            ignore_whitespace: true,
          },
        },
        isEmail: {
          errorMessage: "its supposed to be email",
        },
        custom: {
          options: async (email, { req, location, path }) => {
            const result = await this._userRepository.findOne(req.body);
            if (result && result.dataValues)
              throw new Error("email already in use");
          },
        },
      },
      password: {
        in: ["body"],
        isString: {
          errorMessage: "its supposed to be string",
        },
        notEmpty: {
          errorMessage: "its not supposed to be empty",
          options: {
            ignore_whitespace: true,
          },
        },
        isLength: {
          errorMessage: "password min 6 character and max 64 character",
          options: {
            min: 6,
            max: 64,
          },
        },
      },
    });
  }

  loginMiddleware() {
    return checkSchema({
      email: {
        in: ["body"],
        isString: {
          errorMessage: "its supposed to be string",
        },
        notEmpty: {
          errorMessage: "its not supposed to be empty",
          options: {
            ignore_whitespace: true,
          },
        },
        isEmail: {
          errorMessage: "its supposed to be email",
        },
        custom: {
          options: async (email, { req, location, path }) => {
            const result = await this._userRepository.findOne(req.body);
            if (!result || !result.dataValues) {
              throw new Error("email or password is wrong");
            }
          },
        },
      },
      password: {
        in: ["body"],
        isString: {
          errorMessage: "its supposed to be string",
        },
        notEmpty: {
          errorMessage: "its not supposed to be empty",
          options: {
            ignore_whitespace: true,
          },
        },
        isLength: {
          errorMessage: "password min 6 character and max 64 character",
          options: {
            min: 6,
            max: 64,
          },
        },
      },
    });
  }
}

module.exports = AuthMiddleware;
