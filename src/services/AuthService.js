const bcrypt = require("bcrypt");
const ErrorFormatter = require("../helper/ErrorFormatter.js");

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
      ` [x]  Verifying user email using verificationEmail method AuthServices: `,
      emailToken
    );

    const userTokenResult = await this._userRepository.findEmailTokenAndUser(
      emailToken
    );

    if (!userTokenResult)
      throw new ErrorFormatter(
        userTokenResult,
        "invalid token",
        "token",
        "body"
      );

    const payload = { is_verified: true };

    const updatedResult = await this._userRepository.updateUser(
      payload,
      userTokenResult.User.dataValues
    );

    let result;

    updatedResult.forEach((val) => (result = val));

    return result;
  }
}

module.exports = AuthService;
