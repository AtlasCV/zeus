const Promise = require("bluebird");
const db = require("../models");

const {
  Applicant,
  User,
  EducationExperience,
  ApplicantSkill,
  ApplicantIndustrySector,
  JobExperience
} = require("../models");

const userSeedData = [
  {
    firstName: "Bobby",
    lastName: "Jones",
    email: "bobby.jones@example.com",
    password: "11111111"
  },
  {
    firstName: "Shelly",
    lastName: "Smith",
    email: "shelly.smith@example.com",
    password: "11111111"
  },
  {
    firstName: "Jimmy",
    lastName: "McGill",
    email: "saul.goodman@example.com",
    password: "11111111"
  }
];

const applicantSeedData = [
  {
    UserId: 1,
    linkedIn: "www.example.com/linkedin",
    city: "New York, NY",
    aboutMe: "I want a job."
  },
  {
    UserId: 2,
    linkedIn: "www.example.com/linkedin",
    city: "Brooklyn, NY",
    aboutMe: "I also want a job."
  },
  {
    UserId: 3,
    linkedIn: "www.example.com/linkedin",
    city: "Westchester, NY",
    aboutMe: "I also also want a job."
  }
];

const educationExperienceSeedData = [
  {
    ApplicantId: 1,
    areaOfStudy: "Accounting",
    gpa: "3.7",
    university: "University of Connecticut"
  },
  {
    ApplicantId: 2,
    areaOfStudy: "Finance",
    gpa: "3.5",
    university: "Yale University"
  },
  {
    ApplicantId: 3,
    areaOfStudy: "Marketing",
    gpa: "3.2",
    university: "Harvard University"
  }
];

const jobExperienceSeedData = [
  {
    ApplicantId: 1,
    name: "Accounting Intern",
    numOfYears: 1,
    currentlyWokringHere: false,
    description: "Internship"
  },
  {
    ApplicantId: 2,
    name: "Finance Intern",
    numOfYears: 1,
    currentlyWokringHere: false,
    description: "Internship"
  },
  {
    ApplicantId: 3,
    name: "Marketing Intern",
    numOfYears: 1,
    currentlyWokringHere: false,
    description: "Internship"
  }
];

const applicantSkillSeedData = [
  {
    ApplicantId: 1,
    SkillId: 15,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 1,
    SkillId: 16,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 1,
    SkillId: 17,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 2,
    SkillId: 20,
    yearsExperience: "3 - 5 years"
  },
  {
    ApplicantId: 2,
    SkillId: 21,
    yearsExperience: "3 - 5 years"
  },
  {
    ApplicantId: 2,
    SkillId: 3,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 3,
    SkillId: 11,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 3,
    SkillId: 2,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 1,
    SkillId: 6,
    yearsExperience: "1 - 2 years"
  }
];

const applicantIndustrySectorSeedData = [
  {
    ApplicantId: 1,
    IndustrySectorId: 10,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 1,
    IndustrySectorId: 11,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 1,
    IndustrySectorId: 12,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 2,
    IndustrySectorId: 14,
    yearsExperience: "3 - 5 years"
  },
  {
    ApplicantId: 2,
    IndustrySectorId: 15,
    yearsExperience: "3 - 5 years"
  },
  {
    ApplicantId: 2,
    IndustrySectorId: 16,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 3,
    IndustrySectorId: 21,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 3,
    IndustrySectorId: 22,
    yearsExperience: "1 - 2 years"
  },
  {
    ApplicantId: 1,
    IndustrySectorId: 20,
    yearsExperience: "1 - 2 years"
  }
];

const seedApplicants = () =>
  Promise.each(userSeedData, user => User.create(user))
    .then(users => console.log(`Successfully seeded ${users.length} users.`))
    .then(() =>
      Promise.each(applicantSeedData, applicant => Applicant.create(applicant))
    )
    .then(applicants =>
      console.log(`Successfully seeded ${applicants.length} applicants.`)
    )
    .then(() =>
      Promise.each(educationExperienceSeedData, educationExperience =>
        EducationExperience.create(educationExperience)
      )
    )
    .then(educationExperiences =>
      console.log(
        `Successfully seeded ${
          educationExperiences.length
        } educationExperiences.`
      )
    )
    .then(() =>
      Promise.each(jobExperienceSeedData, jobExperience =>
        JobExperience.create(jobExperience)
      )
    )
    .then(jobExperiences =>
      console.log(
        `Successfully seeded ${jobExperiences.length} jobExperiences.`
      )
    )
    .then(() =>
      Promise.each(applicantSkillSeedData, applicantSkill =>
        ApplicantSkill.create(applicantSkill)
      )
    )
    .then(applicantSkills =>
      console.log(
        `Successfully seeded ${applicantSkills.length} applicantSkills.`
      )
    )
    .then(() =>
      Promise.each(applicantIndustrySectorSeedData, applicantIndustrySector =>
        ApplicantIndustrySector.create(applicantIndustrySector)
      )
    )
    .then(applicantIndustrySectors =>
      console.log(
        `Successfully seeded ${
          applicantIndustrySectors.length
        } applicantIndustrySectors.`
      )
    );
module.exports = { seedApplicants };
