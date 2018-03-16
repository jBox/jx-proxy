const cv = require("config-vars");

module.exports = cv.setup((getenv) => ({
    port: 80,
    router: {
        wx: { from: getenv("ROUTER_WX_FROM"), to: getenv("ROUTER_WX_TO") },
        api: { from: getenv("ROUTER_API_FROM"), to: getenv("ROUTER_API_TO") },
        admin: { from: getenv("ROUTER_ADMIN_FROM"), to: getenv("ROUTER_ADMIN_TO") },
        internal: { from: getenv("ROUTER_INTERNAL_FROM"), to: getenv("ROUTER_INTERNAL_TO") }
    }
}));