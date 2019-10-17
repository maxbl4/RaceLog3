var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/logger', function(request, response) {
  console.log('POST /')
  console.dir(request.body)
  response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
  response.end('thanks')
})

port = 3001
app.listen(port)
console.log(`Listening at http://localhost:${port}`)