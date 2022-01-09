class AuthController {
  register(req, res, next) {
    return res.json({
      data: "hello form register controller",
    });
  }
}

module.exports = new AuthController();
