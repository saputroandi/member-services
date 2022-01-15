const bcrypt = require("bcrypt");
const ErrorFormatter = require("../helper/ErrorFormatter");

class AuthService {
  _userRepository;

  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async registration(user) {
    const result = await this._userRepository.save(user);

    return result;
  }

  async login(user) {
    const resultUser = await this._userRepository.findOne(user);

    const validPassword = await bcrypt.compare(
      user.password,
      resultUser.dataValues.password
    );

    if (!resultUser || !validPassword) {
      throw new ErrorFormatter(
        user.email,
        "email or password is wrong",
        "password",
        "body"
      );
    }

    delete resultUser.dataValues.password;

    return resultUser;
  }
}

module.exports = AuthService;
