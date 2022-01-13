const ErrorFormatter = require("../helper/ErrorFormatter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

class AuthController {
  _authService;

  constructor(authService) {
    this._authService = authService;
  }

  async registration(req, res, next) {
    const payload = req.body;

    let result = {
      status: 200,
    };

    try {
      result.user = await this._authService.registration(payload);
    } catch (err) {
      result.error = ErrorFormatter.format(err);
      result.status = 500;
    }

    return res.status(result.status).json(result);
  }

  // async login(req, res, next) {
  //   const payload = req.body

  //   let result = {
  //     status: 200,
  //   }

  //   try {
  //     const user = await db.User.findOne({ where: { email: payload.email } })

  //     const validPassword = await bcrypt.compare(
  //       payload.password,
  //       user.dataValues.password
  //     )

  //     if (!user || !validPassword) {
  //       return res.status(400).send("Email or password is wrong")
  //     }

  //     delete user.dataValues.password

  //     const token = jwt.sign(user.dataValues, config.SECRET_KEY)

  //     result.user = user
  //     result.token = token
  //   } catch (err) {
  //     result.error = ErrorFormatter.format(err)
  //     result.status = 500
  //   }

  //   return res.status(result.status).json(result)
  // }
}

module.exports = AuthController;
