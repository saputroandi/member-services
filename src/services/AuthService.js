class AuthService {
  _userRepository;

  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async registration(user) {
    const validUser = this._isValidRegistrationUser(user);

    const result = await this._userRepository.save(validUser);

    return result;
  }

  _isValidRegistrationUser(user) {
    // const schema = Joi.object({
    //   password: Joi.string().required().min(6).max(64),
    //   email: Joi.string()
    //     .required()
    //     .email()
    //     .custom((email, helper) => {
    //       const result = this._userRepository.findOne(email).then((email) => {
    //         return helper.message("email has been taken");
    //       });

    // if (result) return helper.message("email has been taken");

    //   return email;
    // }),
    // .messages({
    //   "any.custom": "paul lu",
    // }),
    // });

    // const { error } = schema.validateAsync(user);

    // if (error) throw new ValidationError(error.message);

    // return user;

    return user;
  }
}

module.exports = AuthService;
