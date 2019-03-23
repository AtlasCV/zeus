"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};

let sequelize;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: match[4],
    host: match[3],
    logging: true //false
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(({
  Applicant,
  ApplicantSkill,
  EducationExperience,
  Industry,
  Job,
  JobExperience,
  Match,
  User,
  Skill,
  Certification,
  IndustrySector,
  ApplicantIndustrySector,
  PersonalityEvaluation
}) => {
  Applicant.belongsTo(User);
  User.hasOne(Applicant);

  JobExperience.belongsTo(Applicant);
  Applicant.hasMany(JobExperience);

  EducationExperience.belongsTo(Applicant);
  Applicant.hasMany(EducationExperience);

  Match.belongsTo(Applicant);
  Applicant.hasMany(Match);

  Match.belongsTo(Job);
  Job.hasMany(Match);

  Job.belongsTo(Industry);
  Industry.hasMany(Job);

  Job.belongsToMany(Applicant, { through: "ApplicantJob" });
  Applicant.belongsToMany(Job, { through: "ApplicantJob" });

  Applicant.belongsToMany(Industry, { through: "ApplicantIndustry" });
  Industry.belongsToMany(Applicant, { through: "ApplicantIndustry" });

  Applicant.belongsToMany(Certification, { through: "ApplicantCertification" });
  Certification.belongsToMany(Applicant, { through: "ApplicantCertification" });

  ApplicantSkill.belongsTo(Applicant);
  ApplicantSkill.belongsTo(Skill);

  Skill.hasMany(ApplicantSkill);
  Applicant.hasMany(ApplicantSkill);

  ApplicantIndustrySector.belongsTo(Applicant);
  ApplicantIndustrySector.belongsTo(IndustrySector);

  IndustrySector.hasMany(ApplicantIndustrySector);
  Applicant.hasMany(ApplicantIndustrySector);

  PersonalityEvaluation.belongsTo(Applicant);
  Applicant.hasOne(PersonalityEvaluation);
})(db);

function sync(force) {
  const syncOrAuthenticate =
    env === "test" || env === "circle_test"
      ? db.sequelize.sync({ force })
      : db.sequelize.authenticate();

  return syncOrAuthenticate
    .then(() =>
      console.log(
        `${
          env === "test" ? "Synced" : "Authenticated"
        } models to db in ${env} env`
      )
    )
    .catch(fail => {
      if (fail) {
        console.error("********** database error ***********");
        console.error("    Could not connect to database");
        console.error(fail);
        console.error("*************************************");
        return;
      }
    });
}

db.didSync = sync();

module.exports = db;
