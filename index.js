const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const AuthRoutes = require("./src/routes/AuthRoutes");

class App {
  app;

  constructor() {
    this.app = express();
    this._config();
    this._routes();
  }

  _config() {
    this.app.use(helmet());
    this.app.use(cors());
  }

  _routes() {
    this.app.route("/").get((req, res, next) => {
      return res.json({
        data: "hello world",
      });
    });

    this.app.use("/auth", AuthRoutes);
  }
}

const port = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
