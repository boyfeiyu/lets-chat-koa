const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const { createServer } = require('http')
const { Server } = require('socket.io')

const userRouter = require('../router/user.router')
const messageRouter = require('../router/message.router')

const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(messageRouter.routes())
app.use(messageRouter.allowedMethods())

const httpServer = createServer(app.callback())

const io = new Server(httpServer, {
  path: '/socket.io',
  cors: true,
})

io.on('connection', socket => {
  socket.on('sendMessage', (sender, receiver) => {
    console.log('sendMessage', sender, receiver)
    io.emit('showMessage', sender, receiver)
  })
})

module.exports = httpServer
