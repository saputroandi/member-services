const ErrorFormatter = require("../helper/ErrorFormatter");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { validationResult, Result } = require("express-validator");
var amqp = require("amqplib/callback_api");
const { v4: uuidv4 } = require("uuid");

class AuthController {
  _authService;

  constructor(authService) {
    this._authService = authService;
  }

  async registration(req, res, next) {
    let result = {
      status: 200,
    };

    try {
      const user = req.body;
      const token = uuidv4();

      console.log(
        " [x]  Try to registering user and generate token :",
        user,
        token
      );

      const mailData = {
        user: user,
        subject: "Verification Code from Ganti",
        text: `Please enter the code ${token} to verify your account.`,
      };

      validationResult(req).throw();
      console.log(" [x]  No error from user request");

      this._queueEmailJobs(mailData);
      console.log(" [x]  Add mail jobs from controller");

      result.user = await this._authService.registration(user, token);
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

  async emailVerification(req, res, next) {
    const emailToken = req.body;
    console.log(" [x]  Get token from request body: ", emailToken);

    let result = {
      status: 200,
    };

    try {
      // validationResult(req).throw();

      const user =
        await this._authService.verifyEmailCodeAndUpdateUserEmailStatus(
          emailToken
        );

      result.user = user;
    } catch (err) {
      if (err instanceof ErrorFormatter) {
        result.error = err;
      } else {
        console.log(err);
        // result.error = err.mapped();
      }
      result.status = 500;
    }

    return res.status(result.status).json(result);
  }

  _queueEmailJobs(mailData) {
    console.log(" [x]  Sending jobs to email verification channel");

    amqp.connect("amqp://localhost", (err0, connection) => {
      console.log(" [x]  Connected to message browser");

      if (err0) throw err0;

      connection.createChannel((err1, channel) => {
        console.log(" [x]  Created channel jobs email verification");

        if (err1) throw err1;

        const queue = "email_verification";
        const payload = JSON.stringify(mailData);

        console.log(" [x]  Convert to string", payload);

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(payload));

        console.log(" [x]  Send jobs to email verification channel");
      });

      setTimeout(function () {
        connection.close();
      }, 1000);
    });
  }
}

module.exports = AuthController;
