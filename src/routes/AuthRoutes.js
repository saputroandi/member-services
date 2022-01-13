const Router = require("express").Router;

const AuthController = require("../controller/AuthController");

class AuthRouter {
  router;
  _authController;

  constructor(authController) {
    this.router = Router();
    this._authController = authController;
    this._routes();
  }

  _routes() {
    this.router.post("/register", (req, res, next) =>
      this._authController.registration(req, res, next)
    );
    // this.router.post("/login", AuthController.login)
  }
}

module.exports = AuthRouter;
