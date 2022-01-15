const ErrorFormatter = require("../helper/ErrorFormatter");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { validationResult } = require("express-validator");

class AuthController {
  _authService;

  constructor(authService) {
    this._authService = authService;
  }

  async registration(req, res, next) {
    let result = {
      status: 200,
    };

    try {
      const payload = req.body;

      validationResult(req).throw();

      result.user = await this._authService.registration(payload);
    } catch (err) {
      result.error = err.mapped();
      result.status = 500;
    }

    return res.status(result.status).json(result);
  }

  async login(req, res, next) {
    const payload = req.body;
    console.log("asu");

    let result = {
      status: 200,
    };

    try {
      validationResult(req).throw();

      const user = await this._authService.login(payload);

      const token = jwt.sign(user.dataValues, config.SECRET_KEY);

      result.user = user;
      result.token = token;
    } catch (err) {
      if (err instanceof ErrorFormatter) {
        result.error = err;
      } else {
        result.error = err.mapped();
      }
      result.status = 500;
    }

    return res.status(result.status).json(result);
  }
}

module.exports = AuthController;
