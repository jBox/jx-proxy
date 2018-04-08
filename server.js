#!/usr/bin/env node

/**
 * Module dependencies.
 */
const { env } = require("./configuration");
const app = require("./app");
const http = require("http");
const https = require("https");
const Path = require("path");
const fs = require("fs");

const httpsOptions = {
  key: fs.readFileSync(Path.resolve(env.ssl.cert, "privatekey.pem")),
  cert: fs.readFileSync(Path.resolve(env.ssl.cert, "certificate.pem"))
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(env.port);
const httpsPort = normalizePort(env.ssl.port);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const httpsServer = https.createServer(app, httpsOptions);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

httpsServer.listen(httpsPort);
httpsServer.on("error", onError);
httpsServer.on("listening", onSslListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind);
}

/**
 * Event listener for HTTPS server "listening" event.
 */

function onSslListening() {
  const addr = httpsServer.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind);
}
