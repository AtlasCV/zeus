module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "zeus_dev",
    host: "localhost",
    port: "5432",
    logging: false,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: null,
    database: "zeus_test",
    host: "127.0.0.1",
    port: "5432",
    logging: false,
    dialect: "postgres"
  },
  production: {
    username: "zeus_admin",
    password: "zeusrocks",
    database: "zeus_stage",
    host: "",
    port: "5432",
    logging: false,
    dialect: "postgres"
  },
  staging: {
    username: "root",
    password: "superroot",
    database: "showcase-dev",
    host: "showcase-dev.cedtvuslgbbr.us-east-1.rds.amazonaws.com",
    port: "5432",
    logging: false,
    dialect: "postgres"
  }
};
