const Promise = require("bluebird");
const db = require("../models");

const { Industry } = db;

const seedData = [
  { name: "Finance" },
  { name: "Accounting" },
  { name: "Insurance" },
  { name: "Human Resources" }
];

const seedIndustries = () =>
  Promise.each(seedData, industry => Industry.create(industry)).then(
    industries =>
      console.log(`Successfully seeded ${industries.length} industries.`)
  );

module.exports = { seedIndustries };
