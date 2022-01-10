class ErrorFormatter {
  static format(val) {
    const { errors } = val;
    let error = {};

    for (const objError of errors) {
      error.message = objError.message;
      error.path = objError.path;
    }

    return error;
  }
}

module.exports = ErrorFormatter;
