const { seedCertifications } = require("./certificationSeed");
const { seedIndustries } = require("./industrySeed");
const { seedIndustrySectors } = require("./industrySectorSeed");
const { seedSkills } = require("./skillSeed");
const { seedApplicants } = require("./applicantSeed");

seedSkills()
  .then(() => seedCertifications())
  .then(() => seedIndustries())
  .then(() => seedIndustrySectors());
// .then(() => seedApplicants());
