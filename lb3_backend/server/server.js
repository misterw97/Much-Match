'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    app.io.on('connect', (socket) => {
      console.log('a user connected');

      socket.on('getNewCode', () => {
        const roomId = randomNumber(100000, 999999);
        socket.emit('receiveNewCode', roomId);
        socket.join(roomId);
      });

      socket.on('swipe_event', (req) => {
        const {to, data} = req;
        socket.to(to).emit('swipe_event', data);
      });

      socket.on('swipe_data', (req) => {
        const {to, data} = req;
        socket.to(to).emit('swipe_data', data);
      });

      socket.on('joinRoom', code => {
        console.log(`joining room ${code}`);
        socket.join(code);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
});
