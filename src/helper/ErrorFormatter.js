class ErrorFormatter {
  value;
  msg;
  param;
  location;

  constructor(value, msg, param, location) {
    this.value = value;
    this.msg = msg;
    this.param = param;
    this.location = location;
  }
  format() {
    let error = {};

    error.value = this.value;
    error.msg = this.msg;
    error.param = this.param;
    error.location = this.location;

    return error;
  }
}

module.exports = ErrorFormatter;
