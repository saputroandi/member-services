const nodemailer = require("nodemailer");
const amqp = require("amqplib/callback_api");

class MailServices {
  transporter;

  constructor() {
    this.setup();
    this.consumeJobs();
  }

  consumeJobs() {
    amqp.connect("amqp://localhost", (err0, connection) => {
      if (err0) throw err0;

      connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const queue = "email_verification";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          async (payload) => {
            const payloadObj = JSON.parse(payload.content.toString());
            await this.sendMail(payloadObj);
            console.log(" [x]  Consume mail jobs and send it");
          },
          {
            noAck: true,
          }
        );
      });
    });
  }

  async sendMail(payload) {
    const { user, subject, text } = payload;

    const mailData = {
      from: "suratbuat6@gmail.com",
      to: user.email,
      subject: subject,
      text: text,
    };

    this.transporter.sendMail(mailData, (error, info) => {
      if (error) console.log(error);
    });
  }

  setup() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "suratbuat6@gmail.com",
        pass: "peambbymezhepkrs",
      },
    });
  }
}

module.exports = MailServices;
