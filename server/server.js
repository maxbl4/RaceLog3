const express = require("express");
const proxy = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

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
let createUserHeader = undefined;
const createUserError =
  "Cannot get token for 'art_creator' user. Unauthorized clients will not able to create user";
const initAuthHeaderForArtCreatorUser = () => {
  fetch(`http://${meshHost}:${meshPort}${meshURLLogin}`, {
    method: "GET",
    headers: {
      Authorization: "Basic " + Buffer.from("art_creator:art_creator123#").toString("base64")
    }
  })
    .then(response => {
      if (response.ok) {
        response.json().then(jsonResponse => {
          createUserHeader = {
            name: "Authorization",
            value: `Bearer ${jsonResponse.token}`
          };
          console.log("'art_creator' user has been logged in successfully");
        });
      } else {
        console.error(createUserError);
      }
    })
    .catch(reject => {
      console.error(createUserError, reject);
    });
};
initAuthHeaderForArtCreatorUser();

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
    if (createUserHeader && req.method === "POST" && req.url === meshURLUsers) {
      proxyReq.headers[createUserHeader.name] = createUserHeader.value;
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
