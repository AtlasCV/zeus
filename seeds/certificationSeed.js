const Promise = require("bluebird");
const db = require("../models");

const { Certification } = db;

const seedData = [
  { name: "Certified Financial Planner (CFP)", IndustryId: 1 },
  { name: "Chartered Financial Analysts (CFA)", IndustryId: 1 },
  { name: "Certified Fund Specialists (CFS)", IndustryId: 1 },
  { name: "Chartered Financial Consultant (ChFC)", IndustryId: 1 },
  { name: "Chartered Investment Counselor (CIC)", IndustryId: 1 },
  { name: "Certified Investment Management Analyst (CIMA)", IndustryId: 1 },
  { name: "Chartered Market Technician (CMT)", IndustryId: 1 },
  { name: "Personal Financial Specialist (PFS)", IndustryId: 1 },
  { name: "Financial Risk Manager (FRM)", IndustryId: 1 },
  { name: "Certified Credit Professional (CCP)", IndustryId: 1 },
  { name: "Chartered Life Underwriter (CLU)", IndustryId: 1 },
  { name: "Series 7 Certified", IndustryId: 1 },
  { name: "Series 66 Certified", IndustryId: 1 },
  {
    name: "Series 63 – Uniform Securities Agent State Law Exam",
    IndustryId: 1
  },
  {
    name: "Series 65 – Uniform Registered Investment Adviser Law Exam (RIA)",
    IndustryId: 1
  },
  {
    name: "Series 66 – Uniform Investment Adviser – Combined State Laws Exam",
    IndustryId: 1
  },
  { name: "Certified Public Accountant (CPA)", IndustryId: 2 },
  { name: "Personal Financial Specialist (PFS)", IndustryId: 2 },
  { name: "Certified Management Accountant (CMA)", IndustryId: 2 },
  { name: "Certified in Financial Management (CFM)", IndustryId: 2 },
  { name: "Certified Internal Auditor (CIA)", IndustryId: 2 },
  { name: "Certification in Control Self Assessment (CCSA)", IndustryId: 2 },
  { name: "Certified Information Systems Auditor (CISA)", IndustryId: 2 },
  { name: "Certified Fraud Examiner (CFE)", IndustryId: 2 }
];

const seedCertifications = () =>
  Promise.each(seedData, certification =>
    Certification.create(certification)
  ).then(certifications =>
    console.log(`Successfully seeded ${certifications.length} certifications.`)
  );

module.exports = { seedCertifications };
