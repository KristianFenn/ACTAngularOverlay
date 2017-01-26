import * as express from 'express'
import * as http from 'http'
import * as path from 'path'

let app = express();
let port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

let server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..\index.js'));
});

server.listen(port);

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}