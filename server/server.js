var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
const logzioLogger = require("logzio-nodejs").createLogger({
  token: "xMmDBYSIUNCxOWbhHstIlamPvOKJMUAB",
  host: "listener-eu.logz.io",
  type: "YourLogType" // OPTIONAL (If none is set, it will be 'nodejs')
});

function sendLogToLogzIO(data) {
  logzioLogger.log(data);
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.post("/logger", function(request, response) {
  console.log(request.body);
  sendLogToLogzIO(request.body);
  response.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
  response.end("Logged");
});

app.get("/api/v2/auth/login", function(req, res) {
  console.log(`GET from UI with URL: ${req.url}`);
  console.log(req.body);

  // var options = {
  //   hostname: "localhost",
  //   port: 8080,
  //   path: "/api/v2/auth/login",
  //   method: "GET",
  //   headers: { authorization: "Basic ZGVtby51c2VyQG1haWwucnU6ZGVtbzEyMw==" }
  // };
  
  res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
  req.pipe(request("http://localhost:8080" + req.url)).pipe(res);
});

port = 3001;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
