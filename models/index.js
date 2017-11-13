'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/dbconfig.js')[env];
const db        = {};



const sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    const model = sequelize['import'](path.join(__dirname, file));
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
  EducationExperience,
  Industry,
  Job,
  JobExperience,
  Match,
  User,
  Skill,
  Certification,
}) => {

  Applicant.belongsTo(User);
  Applicant.belongsTo(EducationExperience);
  Applicant.belongsTo(JobExperience);
  Applicant.belongsTo(Match);
  
  User.hasOne(Applicant);

  Job.belongsToMany(Applicant, { through: 'ApplicantJob' });
  Applicant.belongsToMany(Job, { through: 'ApplicantJob' });
  
  Job.belongsTo(Industry);
  Industry.hasMany(Job);

  Applicant.belongsToMany(Industry, { through: 'ApplicantIndustry' });
  Industry.belongsToMany(Applicant, { through: 'ApplicantIndustry'});

  JobExperience.hasOne(Applicant);
  EducationExperience.hasOne(Applicant);

  Applicant.belongsToMany(Certification, { through: 'ApplicantCertification'})
  Certification.belongsToMany(Applicant, { through: 'ApplicantCertification'})

  Applicant.belongsToMany(Skill, { through: 'ApplicantSkill'})
  Skill.belongsToMany(Applicant, { through: 'ApplicantSkill'})



})(db);

function sync(force) {
  const syncOrAuthenticate = (env === 'test' || env === 'circle_test') ? db.sequelize.sync({ force }) : db.sequelize.authenticate();

  return syncOrAuthenticate
    .then(() => console.log(`${env === 'test' ? 'Synced' : 'Authenticated'} models to db in ${env} env`))
    .catch((fail) => {
      if (fail) {
        console.error('********** database error ***********');
        console.error('    Could not connect to database');
        console.error(fail);
        console.error('*************************************');
        return;
      }
    });
}


db.didSync = sync();

module.exports = db;
