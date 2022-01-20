const Router = require("express").Router;

class AuthRouter {
  router;
  _authController;
  _authMiddleware;

  constructor(authController, authMiddleware = null) {
    this.router = Router();
    this._authController = authController;
    this._authMiddleware = authMiddleware;
    this._routes();
  }

  _routes() {
    this.router.post(
      "/register",
      this._authMiddleware.registrationMiddleware(),
      (req, res, next) => this._authController.registration(req, res, next)
    );

    this.router.post(
      "/login",
      this._authMiddleware.loginMiddleware(),
      (req, res, next) => this._authController.login(req, res, next)
    );

    this.router.post(
      "/email-validation",
      this._authMiddleware.emailVerificationMiddleware(),
      (req, res, next) => this._authController.emailVerification(req, res, next)
    );
  }
}

module.exports = AuthRouter;
