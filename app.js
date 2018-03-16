const Path = require("path");
const express = require("express");
const proxy = require("./proxy");
const cv = require("config-vars");

const app = express();

// proxy
app.use(proxy);

// 404
app.use((req, res, next) => {
    const error = new Error();
    error.statusCode = 404;
    error.status = "Not Found";
    error.message = "Not Found";
    next(error);
});

// error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    return res.send(err);
});

module.exports = app;