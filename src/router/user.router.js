const KoaRouter = require('@koa/router')

const userRouter = new KoaRouter({ prefix: '/user' })

const userConroller = require('../controller/user.controller')

userRouter.post('/register', userConroller.createUser)

userRouter.post('/login', userConroller.login)

userRouter.get('/', userConroller.getUserList)

module.exports = userRouter
