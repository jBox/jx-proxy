// include dependencies
const proxy = require("http-proxy-middleware");
const cv = require("config-vars");

// proxy middleware options
const { wx, api, admin, internal } = cv.env.router;
const options = {
    target: "http://localhost:8080",
    router: {
        // when request.headers.host == "dev.localhost:3000",
        // override target "http://www.example.org" to "http://localhost:8000"
        // "dev.localhost:3000": "http://localhost:8000"
        [wx.from]: wx.to,
        [api.from]: api.to,
        [admin.from]: admin.to,
        [internal.from]: internal.to
    },
    logLevel: "debug"
};

module.exports = proxy(options);