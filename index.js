const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./src/config");

const db = require("./src/db/models");

const MailServices = require("./src/services/MailServices");

const AuthRoutes = require("./src/routes/AuthRoutes");
const AuthController = require("./src/controller/AuthController");
const AuthService = require("./src/services/AuthService");
const SequelizeUserRepository = require("./src/repositories/SequelizeUserRepository");
const AuthMiddleware = require("./src/middleware/AuthMiddleware");

class App {
  app;

  constructor() {
    this.app = express();
    this._plugins();
    this._routes();
    this._jobsServices();
  }

  _plugins() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  _jobsServices() {
    new MailServices();
  }

  _routes() {
    this.app.route("/").get((req, res, next) => {
      return res.json({
        data: "hello world",
      });
    });

    this.app.use(
      "/auth",
      new AuthRoutes(
        new AuthController(new AuthService(new SequelizeUserRepository(db))),
        new AuthMiddleware(new SequelizeUserRepository(db))
      ).router
    );
  }
}

const app = new App().app;

app.listen(config.APP_PORT, () => {
  console.log(`App listening on port ${config.APP_PORT}`);
});
