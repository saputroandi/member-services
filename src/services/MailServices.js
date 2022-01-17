const nodemailer = require("nodemailer");

class MailServices {
  transporter;

  constructor() {
    this.setup();
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
