const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const { md5password } = require('../utils/md5-password')

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../config/keys/private.key')
)
const publicKey = fs.readFileSync(
  path.resolve(__dirname, '../config/keys/public.key')
)

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
        code: -1002,
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
  async login(ctx, next) {
    const user = ctx.request.body
    const dUserList = await userService.findUserByName(user.name)
    if (dUserList.length === 0) {
      ctx.body = {
        code: -1011,
        message: '用户不存在',
      }
      return
    }
    const dUser = dUserList[0]
    if (md5password(user.name, user.password) === dUser.password) {
      const payload = {
        userId: dUser.id,
        name: dUser.name,
      }
      const token = jwt.sign(payload, privateKey, {
        expiresIn: 60 * 60 * 24,
        algorithm: 'RS256',
      })
      ctx.body = {
        code: 0,
        userId: dUser.id,
        name: dUser.name,
        avatar_url: dUser.avatar_url,
        token,
      }
      console.log('登录成功')
    } else {
      ctx.body = {
        code: -1012,
        message: '账号或密码错误',
      }
      console.log('账号或密码错误~')
    }
    console.log(dUser)
  }
  async getUserList(ctx, next) {
    const userList = await userService.getUserList()
    ctx.body = {
      code: 0,
      userList,
    }
  }
}

module.exports = new UserController()
