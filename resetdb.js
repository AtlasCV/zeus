const db = require("./models/");

db.didSync
  .then(() => db.sequelize.queryInterface.dropAllTables({ force: true }))
  .then(() => {
    console.log("Data base has been flushed!");
    return null;
  })
  .catch(error => console.error(error))
  .finally(() => {
    db.didSync = db.sequelize.close();
    return db.didSync;
  });
