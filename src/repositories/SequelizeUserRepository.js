class SequelizeUserRepository {
  _User;

  constructor(db) {
    this._User = db.User;
  }

  async save(user) {
    try {
      const result = await this._User.create(user);

      return result;
    } catch (err) {
      console.log(err);
      throw new Error("cant query to db");
    }
  }

  async findOne(user) {
    try {
      const result = await this._User.findOne({
        where: {
          email: user.email,
        },
      });

      return result;
    } catch (err) {
      throw new Error("cant query to db");
    }
  }
}

module.exports = SequelizeUserRepository;
