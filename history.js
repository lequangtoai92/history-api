/**
 * @author Toailq - 23/04/2018
*/
let config = require('./config/Config'),
  bodyParser = require('body-parser'),
  express = require('express')


require('./config/Global')

let app = express(),
  port = config.serverPort

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {//root middleware
  try {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
      req.socket.remoteAddress || req.connection.socket.remoteAddress
    console.log('\x1b[31m', '-from:', ip, '\x1b[34m', '-to->', req.headers.host + req.url, '\x1b[0m')
    //
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    return next()
  } catch (error) {
    console.log('--midleware error: ', error)
  }
})

require('./routers/_ac/r_ac100')(app)
require('./routers/_adm/r_adm100')(app)

app.listen(port)
console.log('FACILIO-API started on: ' + port)
