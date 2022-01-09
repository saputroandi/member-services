const Router = require("express").Router;

const AuthController = require("../controller/AuthController");

class AuthRouter {
  _router;

  constructor() {
    this._router = Router();
    this._routes();
  }

  _routes() {
    this._router.get("/register", AuthController.register);
  }
}

module.exports = new AuthRouter()._router;
