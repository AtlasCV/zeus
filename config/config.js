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
    host: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
    port: "5432",
    logging: false,
    dialect: "postgres"
  }
};
