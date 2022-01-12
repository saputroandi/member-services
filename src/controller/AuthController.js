const db = require("../models");
const ErrorFormatter = require("../helper/ErrorFormatter");

class AuthController {
  async register(req, res, next) {
    const payload = req.body;
    console.log(payload);

    let result = {
      status: 200,
    };

    try {
      result.user = await db.User.create(payload);
    } catch (err) {
      result.error = ErrorFormatter.format(err);
      result.status = 500;
    }

    return res.json(result);
  }
}

module.exports = new AuthController();
