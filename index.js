var midi = require('midi');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/squares.pde', function (req, res) {
  res.sendfile(__dirname + '/squares.pde');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('midimessage', function (data) {
    console.log(data);
  });
});

// Set up a new input.
var input = new midi.input();

// Configure a callback.
input.on('message', function(deltaTime, message) {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  console.log(message, deltaTime);
  io.emit('midimessage', message);
});

input.openPort(0);
// Open the first available input port.
//input.openVirtualPort('yourmom');

input.ignoreTypes(false, false, false);




// ... receive MIDI messages ...

// Close the port when done.
//input.closePort();