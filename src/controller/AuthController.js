const ErrorFormatter = require("../helper/ErrorFormatter");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { validationResult } = require("express-validator");
var amqp = require("amqplib/callback_api");
// const MailServices = require("../services/MailServices");

class AuthController {
  _authService;

  constructor(authService) {
    this._authService = authService;
  }

  async registration(req, res, next) {
    let result = {
      status: 200,
    };

    // const mail = new MailServices();

    try {
      const user = req.body;
      // const mailData = {
      //   user: payload,
      //   subject: "test mail",
      //   text: "test mail",
      // };

      // await mail.sendMail(mailData);

      validationResult(req).throw();

      // this._queueEmailJobs(user);

      result.user = await this._authService.registration(user);
    } catch (err) {
      result.error = err.mapped();
      result.status = 500;
    }

    return res.status(result.status).json(result);
  }

  async login(req, res, next) {
    const payload = req.body;

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

  _queueEmailJobs(user) {
    amqp.connect("amqp://localhost", (err0, connection) => {
      if (err0) throw err0;

      connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const queue = "email_verification";
        const message = JSON.stringify(user);

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(message));

        console.log(" [x] Sent %s", message);
      });
    });
  }
}

module.exports = AuthController;
