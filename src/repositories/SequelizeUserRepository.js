class SequelizeUserRepository {
  _User;
  _EmailToken;

  constructor(db) {
    this._User = db.User;
    this._EmailToken = db.EmailToken;
  }

  // async save(user) {
  //   try {
  //     const result = await this._User.create(user);

  //     return result;
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error("cant save user");
  //   }
  // }

  async createUserWithEmailToken(user, token) {
    try {
      const EmailToken = this._EmailToken;

      const result = await this._User.create(
        {
          ...user,
          EmailToken: {
            token: token,
          },
        },
        { include: EmailToken }
      );

      return result;
    } catch (err) {
      console.log(err);
      throw new Error("cant save user with token");
    }
  }

  async findOneUser(user) {
    try {
      const result = await this._User.findOne({
        where: {
          email: user.email,
        },
      });

      return result;
    } catch (err) {
      throw new Error("cant find user");
    }
  }

  async findEmailTokenAndUser(emailToken) {
    try {
      const User = this._User;

      const result = await this._EmailToken.findOne({
        where: {
          token: emailToken.token,
        },
        include: User,
      });

      return result;
    } catch (err) {
      throw new Error("cant find user");
    }
  }

  async updateUser(objPayload, user) {
    try {
      const result = await this._User.update(objPayload, {
        where: {
          email: user.email,
        },
      });

      return result;
    } catch (err) {
      throw new Error("cant update user");
    }
  }
}

module.exports = SequelizeUserRepository;
