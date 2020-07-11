const express = require('express');
const morgan = require('morgan');
const api = require('./api');
const cors = require('cors');
const {debug} = require('./lib/debug');
const app = express();
const {metrics} = require('./lib/exporter');
const port = process.env.PORT || 6000;

//app.use(metrics);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));


app.use('/', api);

app.use('*', (req, res) => {
    res.status(400).send({
        error: "URL doesnt exist"
    });
});

app.listen(port, function() {
    console.log("== Server running on port: ", port);
});