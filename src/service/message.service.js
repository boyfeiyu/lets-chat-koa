const connection = require('../app/database')

class MessageService {
  async sendMessage(sender, receiver, message) {
    const statement =
      'INSERT INTO message(sender,receiver,message) values(?,?,?);'
    return connection.execute(statement, [sender, receiver, message])
  }
  async getMessageList(sender, receiver) {
    const statement =
      'SELECT id,message FROM message WHERE sender=? AND receiver=?;'
    const [rightList] = await connection.execute(statement, [sender, receiver])
    const [leftList] = await connection.execute(statement, [receiver, sender])
    leftList.forEach(i => (i.d = 'left'))
    rightList.forEach(i => (i.d = 'right'))
    const messageList = [...leftList, ...rightList].sort((a, b) => {
      return a.id - b.id
    })
    // console.log(messageList)
    return messageList
  }
}

module.exports = new MessageService()
