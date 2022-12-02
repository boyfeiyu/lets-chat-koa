const mysql = require('mysql2')
const mysqlConfig = require('../config/database.config')

const connectionPool = mysql.createPool(mysqlConfig)

// 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败', err)
    return
  } else {
    connection.connect(err => {
      if (err) {
        console.log('和数据库交互失败', err)
      } else {
        // console.log('数据库连接成功')
      }
    })
  }
})

const connection = connectionPool.promise()

module.exports = connection
