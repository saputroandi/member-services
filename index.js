const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./src/db/models");

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
  }

  _plugins() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
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

const port = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
