const KoaRouter = require('@koa/router')

const messageRouter = new KoaRouter({ prefix: '/message' })

const messageConroller = require('../controller/message.controller')

messageRouter.post('/', messageConroller.sendMessage)
messageRouter.post('/sendtest', messageConroller.sendMessagetest)
messageRouter.get('/', messageConroller.getMessageList)

module.exports = messageRouter
