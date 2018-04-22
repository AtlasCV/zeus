const Promise = require("bluebird");
const db = require("../models");

const { Skill } = db;

const seedData = [
  { name: "client_relationship", displayName: "Client Relationships" },
  { name: "microsoft_office", displayName: "Microsoft Office" },
  { name: "quickbooks", displayName: "Quickbooks" },
  { name: "book_keeping", displayName: "Book Keeping" },
  { name: "tax_software", displayName: "Tax Software" },
  { name: "it", displayName: "I.T." },
  { name: "data_entry", displayName: "Data Entry" },
  {
    name: "financial_statement_analysis",
    displayName: "Financial Statement Analysis"
  },
  { name: "financial_planning", displayName: "Financial Planning" },
  { name: "debt_consolidation", displayName: "Debt Consolidation" },
  { name: "sales", displayName: "Sales" },
  { name: "web_development", displayName: "Web Development" },
  { name: "account_reconciliation", displayName: "Account Reconciliation" },
  { name: "payroll_management", displayName: "Payroll Management" },
  { name: "budgeting", displayName: "Budgeting" },
  { name: "forecasting", displayName: "Forecasting" },
  { name: "corporate_reporting", displayName: "Corporate Reporting" },
  { name: "public_speaking", displayName: "Public Speaking" },
  { name: "analytical_writing", displayName: "Analytical Writing" },
  { name: "cost_accounting", displayName: "Cost Accounting" },
  { name: "federal_tax_law", displayName: "Federal Tax Law" }
];

const seedSkills = () =>
  Promise.each(seedData, skill => Skill.create(skill)).then(skills =>
    console.log(`Successfully seeded ${skills.length} skills.`)
  );

module.exports = { seedSkills };
