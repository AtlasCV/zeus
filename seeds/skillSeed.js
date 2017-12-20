const Promise = require("bluebird");
const db = require("../models");

const { Skill } = db;

const seedData = [
  { name: "client_relationship" },
  { name: "microsoft_office" },
  { name: "quickbooks" },
  { name: "book_keeping" },
  { name: "tax_software" },
  { name: "it" },
  { name: "data_entry" },
  { name: "financial_statement_analysis_analysis" },
  { name: "financial_planning" },
  { name: "debt_consolidation" },
  { name: "sales" },
  { name: "web_development" },
  { name: "account_reconciliation" },
  { name: "payroll_management" },
  { name: "budgeting" },
  { name: "forecasting" },
  { name: "corporate_reporting" },
  { name: "public_speaking" },
  { name: "analytical_writing" },
  { name: "cost_accounting" },
  { name: "federal_tax_la" }
];

const seedIndustries = () => {
  Promise.each(seedData, skill => Skill.create(skill));
};

seedIndustries().then(skills =>
  console.log(`Successfully seeded ${skills.length} skills.`)
);
