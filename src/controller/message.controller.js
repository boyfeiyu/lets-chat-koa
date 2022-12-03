const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const messageService = require('../service/message.service')

const publicKey = fs.readFileSync(
  path.resolve(__dirname, '../config/keys/public.key')
)

class MessageController {
  async sendMessage(ctx, next) {
    const messageData = ctx.request.body
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    if (!messageData.sender || !messageData.receiver || !messageData.message) {
      ctx.body = {
        code: -1020,
        message: '参数有误',
      }
      return
    }

    const { sender, receiver, message } = messageData
    try {
      const vtoken = jwt.verify(token, publicKey)
      if (vtoken.userId === sender) {
        await messageService.sendMessage(sender, receiver, message)
        ctx.body = {
          code: 0,
          message: '发送消息成功',
        }
        return
      } else {
        ctx.body = {
          code: -1009,
          message: '登录用户与发送消息用户不一致！',
        }
        return
      }
    } catch (error) {
      ctx.body = {
        code: -1008,
        message: 'token验证失败',
      }
    }
  }

  async sendMessagetest(ctx, next) {
    console.log('first')
    const messageData = ctx.request.body
    if (!messageData.sender || !messageData.receiver || !messageData.message) {
      ctx.body = {
        code: -1020,
        message: '参数有误',
      }
      return
    }

    const { sender, receiver, message } = messageData
    await messageService.sendMessage(sender, receiver, message)
    ctx.body = {
      code: 0,
      message: '发送消息成功',
    }
    return
  }

  async getMessageList(ctx, next) {
    const query = ctx.query
    const { sender, receiver } = query
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    try {
      const vtoken = jwt.verify(token, publicKey)
      console.log(vtoken)
      if (vtoken.userId + '' === sender) {
        const messageList = await messageService.getMessageList(
          sender,
          receiver
        )
        ctx.body = {
          code: 0,
          messageList,
        }
        return
      } else {
        ctx.body = {
          code: -1009,
          message: '权限错误',
        }
        return
      }
    } catch (error) {
      ctx.body = {
        code: -1008,
        message: 'token验证失败',
      }
    }
  }
}

module.exports = new MessageController()
