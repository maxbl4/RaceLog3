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
const meshURLLogin = meshPrefix + "/auth/login";
const meshURLUsers = meshPrefix + "/users";
// -----------------------------------------------------------------------------------------------

// Login under 'art_creator' user, store it's credentials and add them for all create user requests
async function getAuthHeaderForArtCreatorUser() {
  const headers = new Headers();
  headers.append("Authorization", "Basic " + btoa("art_creator:art_creator123#"));
  const response = await fetch(
    new Request(`http://${meshHost}:${meshPort}${meshURLLogin}`, {
      method: "GET",
      headers: headers
    })
  );

  if (!response.ok) {
    throw new Error("Network response was not OK");
  }
  const jsonResponse = await response.json();
  return {
    name: "Authorization",
    value: `Bearer ${jsonResponse.body.token}`
  };
}

let createUserHeader = undefined;
try {
  createUserHeader = getAuthHeaderForArtCreatorUser();
  console.log("'art_creator' user has been logged in successfully");
} catch (e) {
  console.error(
    "Cannot get token for 'art_creator' user. Unauthorized clients will not able to create user",
    e
  );
}
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
  router: {
    "localhost:3001": `http://${meshHost}:${meshPort}`
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // add new header to response
    if (!proxyRes.statusCode) {
      // if proxy response doesn't have status code, set it up to OK (200)
      proxyRes.statusCode = 200;
    }
  },
  onProxyReq: (proxyReq, req, res) => {
    if (
      createUserHeader &&
      req.method === "POST" &&
      req.url === `http://${host}:${port}${meshURLUsers}`
    ) {
      proxyReq.setHeader(createUserHeader.name, createUserHeader.value);
    }
  }
};

var filter = function(pathname, req) {
  return req.method === "GET" || req.method === "PUT" || req.method === "POST";
};

var meshProxy = proxy(filter, options);

// -----------------------------------------------------------------------------------------------

// Configure server

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(`${meshURLAll}`, meshProxy);

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
