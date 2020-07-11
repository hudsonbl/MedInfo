const makeApiMiddleware = require("express-prom-bundle");
const metrics = makeApiMiddleware({
    includeMethod: true,
    includePath: true,
    customLabels: {
        debug: "Debug message"
    }
});

exports.metrics = metrics;