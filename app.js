const fs = require("fs");
const SwaggerExpress = require("swagger-express-mw");
const https = require("https");
const app = require("express")();
const db = require("./models");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");

// const swaggerSecurityHandlers = require('./config/security');

const port = process.env.PORT || 10013;
const env = process.env.NODE_ENV;

console.log("port", port);
console.log("env", env);

module.exports = app; // for testing

app.use(volleyball);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function customSwaggerErrorHandler(err, req, res, next) {
  if (env === "test") console.error(err);
  if (err.failedValidation) {
    console.error(`Error code 400 sent to user. Message is "${err.message}"`);
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
      validationErrors: err.results
    });
  } else {
    console.error(
      `Error code ${err.statusCode || 500} sent to user. Message is "${
        err.message
      }"`
    );
    res.status(err.statusCode || 500).json({
      success: false,
      status: err.statusCode || 500,
      message: err.message
    });
  }
}

const config = {
  appRoot: __dirname // required config
  // swaggerSecurityHandlers, // to protect routes
};

if (env === "test") {
  // test config
  SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) {
      throw err;
    }
    // install middleware
    swaggerExpress.register(app);
    app.use(customSwaggerErrorHandler);
    app.listen(port);
  });
} else {
  // regular config
  SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) {
      throw err;
    }

    /**
     * Listen on provided port, on all network interfaces...
     */
    if (env === "production" || env === "stage") {
      const clientCertificateAuth = require("client-certificate-auth");

      swaggerExpress.register(app);

      app.use(customSwaggerErrorHandler);
      const httpsServer = https.createServer(SSLOptions, app);

      db.didSync.then(() => {
        httpsServer.listen(port);
      });
    } else {
      swaggerExpress.register(app);
      app.use(customSwaggerErrorHandler);
      db.didSync.then(() => app.listen(port));
    }
  });
}
