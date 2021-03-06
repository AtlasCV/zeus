const fs = require("fs");
const SwaggerExpress = require("swagger-express-mw");
const https = require("https");
const app = require("express")();
const db = require("./models");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const cors = require("cors");

// const swaggerSecurityHandlers = require('./config/security');

const port = process.env.PORT || 10013;
const env = process.env.NODE_ENV;

console.log("port", port);
console.log("env", env);

app.use(volleyball);

app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(bodyParser.json({ limit: "5mb" }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://new-atlas-frontend.s3-website-us-east-1.amazonaws.com",
  "http://d3c2guw9xs641w.cloudfront.net",
  "http://www.atlascv.com",
  "http://atlascv.com",
  "https://atlas-front-end.herokuapp.com/"
];

const whitelist = allowedOrigins;

// const corsOptions = {
//   origin: function(origin, callback) {
//     if (!origin) {
//       callback(null, true);
//     } else if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"]
// };

app.use(cors());

function customSwaggerErrorHandler(err, req, res, next) {
  if (env === "test") console.error(err);
  if (err.failedValidation) {
    console.error(`Error code 400 sent to user. Message is "${err.message}"`);
    res.status().json({
      success: false,
      status: 400,
      message: err.message,
      validationErrors: err.results
    });
  } else {
    console.error(
      `Error code ${err.status || 500} sent to user. Message is "${
        err.message
      }" \n Stack: ${err.stack}`
    );
    res.status(err.status || 500).json({
      success: false,
      status: err.status || 500,
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
      db.didSync.then(() => {
        app.listen(port);
      });
    } else {
      swaggerExpress.register(app);
      app.use(customSwaggerErrorHandler);
      db.didSync.then(() => app.listen(port));
    }
  });
}

module.exports = app; // for testing
