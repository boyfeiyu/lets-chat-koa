const connection = require('../app/database')
const { md5password } = require('../utils/md5-password')
class UserServer {
  async create({ name, password }) {
    const md5pwd = md5password(name, password)
    const statement = 'INSERT INTO user(name,password) values(?,?);'
    return connection.execute(statement, [name, md5pwd])
  }
  async findUserByName(name) {
    const statement = 'SELECT * FROM user WHERE name=?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }
}

module.exports = new UserServer()
