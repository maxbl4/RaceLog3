var express = require('express')
var fs = require('fs')
var app = express()

app.use(express.bodyParser())

app.get('/', function(request, response) {
  console.log('GET /')
  var html = `
    <html>
        <body>
            <form method="post" action="http://localhost:3000">Name: 
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>
        </body>
    </html>`
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(html)
})

app.post('/', function(request, response) {
  console.log('POST /')
  console.dir(request.body)
  response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
  response.end('thanks')
})

port = 3001
app.listen(port)
console.log(`Listening at http://localhost:${port}`)