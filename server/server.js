const express = require("express");
const proxy = require("http-proxy-middleware");
const bodyParser = require("body-parser");

// common variables
const host = "localhost";
const port = 3001;

const meshHost = "localhost";
const meshPort = 8080;
const meshPrefix = "/api/v2";
const meshURLAll = meshPrefix + "/*";
// -----------------------------------------------------------------------------------------------

// Configure logs resinding

const logzioLogger = require("logzio-nodejs").createLogger({
  token: "xMmDBYSIUNCxOWbhHstIlamPvOKJMUAB",
  host: "listener-eu.logz.io",
  type: "YourLogType" // OPTIONAL (If none is set, it will be 'nodejs')
});

function sendLogToLogzIO(data) {
  logzioLogger.log(data);
}

// -----------------------------------------------------------------------------------------------

// Create and configure proxy

var options = {
  target: `http://${host}:${port}`, // target host
  ws: true, // proxy websockets
  proxyTimeout: 30 * 1000, // 30 seconds timeout for response from Proxy
  router: {
    "localhost:3001": `http://${meshHost}:${meshPort}`
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // add new header to response
    if (!proxyRes.statusCode) {
      // if proxy response doesn't have status code, set it up to OK (200)
      proxyRes.statusCode = 200;
    }
    logNetMessage(proxyRes, "Proxy Response");
  },
  onProxyReq: (proxyReq, req, res) => {
    logNetMessage(req, "Request");
  },
  onError: (err, req, res) => {
    console.log("-----------------------------------------------");
    console.log("Error:");
    console.log("    Reason: " + JSON.stringify(err));
    logNetMessage(req, "Error Request");
    logNetMessage(res, "Error Response");
  }
};

function logNetMessage(message, name) {
  console.log("-----------------------------------------------");
  console.log(`${name}:`);
  console.log(`    URL: ${message.url}`);
  console.log(`    Headers: ${JSON.stringify(message.headers)}`);
  console.log(`    Method: ${message.method}`);
  console.log(`    Body: ${JSON.stringify(message.body)}`);
}

var filter = function(pathname, req) {
  return req.method === "GET" || req.method === "PUT" || req.method === "POST";
};

var meshProxy = proxy(filter, options);

// -----------------------------------------------------------------------------------------------

// Configure server

var app = express();

app.use(`${meshURLAll}`, meshProxy); // This one MUST be first one in the 'use' list.
// Otherwise, request's body will not be translated to real server.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

// -----------------------------------------------------------------------------------------------

app.post("/logger", function(request, response) {
  console.log(request.body);
  sendLogToLogzIO(request.body);
  response.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
  response.end("Logged");
});

app.options(`${meshURLAll}`, function(request, response) {
  response.writeHead(200, {
    "Access-Control-Allow-Headers": [
      "Content-Type",
      "Accept",
      "Access-Control-Allow-Origin",
      "Authorization"
    ],
    "Access-Control-Allow-Methods": ["OPTIONS", "HEAD", "DELETE", "POST", "PUT", "GET"],
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "",
    Allow: ["OPTIONS", "HEAD", "DELETE", "POST", "PUT", "GET"]
  });
  response.end("Accepted options");
});

app.listen(port);
console.log(`Listening at http://${host}:${port}`);
