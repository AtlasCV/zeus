const Promise = require("bluebird");
const db = require("../models");

const { IndustrySector } = db;

const seedData = [
  { name: "wealth_management", IndustryId: 1 },
  { name: "investment_banking", IndustryId: 1 },
  { name: "asset_management", IndustryId: 1 },
  { name: "institutional_securities", IndustryId: 1 },
  { name: "commercial_banking", IndustryId: 1 },
  { name: "retirement_solutions", IndustryId: 1 },
  { name: "portfolio_strategy", IndustryId: 1 },
  { name: "advisory_services", IndustryId: 1 },
  { name: "financial_consulting", IndustryId: 1 },
  { name: "financial_compliance", IndustryId: 1 },
  { name: "financial_analysis", IndustryId: 1 },
  { name: "derivatives", IndustryId: 1 },
  { name: "m_and_a_activity", IndustryId: 1 },
  { name: "venture_capital", IndustryId: 1 },
  { name: "financial_audit", IndustryId: 2 },
  { name: "tax_preparation", IndustryId: 2 },
  { name: "accountant_consulting", IndustryId: 2 },
  { name: "accounting_compliance", IndustryId: 2 },
  { name: "forensic_accounting", IndustryId: 2 },
  { name: "underwriting", IndustryId: 3 },
  { name: "human_resources", IndustryId: 4 },
  { name: "marketing" },
  { name: "sales" }
];

const seedIndustrySectors = () =>
  Promise.each(seedData, industrySector =>
    IndustrySector.create(industrySector)
  ).then(industrySectors =>
    console.log(
      `Successfully seeded ${industrySectors.length} Industry Sectors.`
    )
  );

module.exports = { seedIndustrySectors };
