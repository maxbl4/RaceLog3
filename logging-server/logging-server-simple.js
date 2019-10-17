const http = require('http')
const logzioLogger = require('logzio-nodejs').createLogger({
  token: 'xMmDBYSIUNCxOWbhHstIlamPvOKJMUAB',
  host: 'listener-eu.logz.io',
  type: 'YourLogType'     // OPTIONAL (If none is set, it will be 'nodejs')
});

function sendLogToLogzIO(data) {
  logzioLogger.log(data);
}

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
      console.log('Partial body: ' + body)
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      sendLogToLogzIO(body)
      response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
      response.end('post received')
    })
  }
})

const port = 3001
const host = 'localhost'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)