const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');


const APP_PORT = 5555

const server = app.listen(APP_PORT, () => {
  // console.log(`App running on port ${APP_PORT}`)
})

const io = require('socket.io').listen(server)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  socket.on('chatter', (message) => {
    process.stdout.write(message);
    fs.readFile('chat.txt', 'utf8', function(err, contents) {
      console.log(contents);
      io.emit('chatter', contents)
     });
  })
})
