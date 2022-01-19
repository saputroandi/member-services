const bcrypt = require("bcrypt");
const ErrorFormatter = require("../helper/ErrorFormatter");

class AuthService {
  _userRepository;

  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async registration(user, token) {
    console.log(
      " [x]  Registering user use registration method AuthServices :",
      user
    );

    const result = await this._userRepository.createUserWithEmailToken(
      user,
      token
    );

    return result;
  }

  async login(user) {
    const resultUser = await this._userRepository.findOneUser(user);

    const validPassword = await bcrypt.compare(
      user.password,
      resultUser.dataValues.password
    );

    if (!resultUser || !validPassword) {
      throw new ErrorFormatter(
        user.password,
        "email or password is wrong",
        "password",
        "body"
      );
    }

    delete resultUser.dataValues.password;

    return resultUser;
  }

  async verifyEmailCodeAndUpdateUserEmailStatus(emailToken) {
    console.log(
      " [x]  Validating user email using verificationEmail method AuthServices: ",
      emailToken
    );

    const result = await this._userRepository.findEmailTokenAndUser(emailToken);

    return result;
  }
}

module.exports = AuthService;
