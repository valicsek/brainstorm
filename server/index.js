const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');
const routes = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser')

/**
 * Middleware for logging request to console.
 * https://expressjs.com/en/guide/using-middleware.html
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const requestLogger = function (req, res, next) {
    console.info(`CALLED: ${req.originalUrl}`);
    console.info(`METHOD: ${req.method}`);
    next()
}

app.use(requestLogger);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/** No 'Access-Control-Allow-Origin' header is present on the requested resource error */
app.use(cors({
    origin: `http://localhost:${config.client_port}`,
    credentials: true
}));

/** MAKE SURE YOU PUT THIS LINE OF CODE AFTER CORS AND THINGS
 * if not, then you can get Access-Control error as well :).
 */
app.use('/', routes);

app.listen(config.port, (req, res) => {
    console.log(`Server is listening on ${config.port} port`)
});
