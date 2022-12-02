const userService = require('../service/user.service')

class UserController {
  async createUser(ctx, next) {
    const user = ctx.request.body

    const users = await userService.findUserByName(user.name)

    if (!user.name || !user.password) {
      ctx.body = {
        code: -1001,
        message: '用户名或密码不能为空',
      }
      return
    }
    if (users.length > 0) {
      ctx.body = {
        code: -1001,
        message: '用户名已经存在',
      }
      return
    }
    const [values] = await userService.create(user)
    ctx.body = {
      code: 0,
      message: '注册成功',
      id: values.insertId,
    }
  }
}

module.exports = new UserController()
