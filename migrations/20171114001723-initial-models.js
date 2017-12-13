"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable("Applicants", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        linkedIn: {
          type: Sequelize.STRING,
          allowNull: false
        },
        aboutMe: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        transcript: {
          type: Sequelize.STRING,
          allowNull: true
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("Certifications", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("EducationExperiences", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        areaOfStudy: {
          type: Sequelize.STRING,
          allowNull: true
        },
        gpa: {
          type: Sequelize.STRING,
          allowNull: true
        },
        educationLevel: {
          type: Sequelize.STRING,
          allowNull: true
        },
        university: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("Industries", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("Jobs", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("JobExperiences", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        numOfYears: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        currentlyWorkingHere: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("Matches", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true
        },
        matchScore: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("Skills", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable("Users", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        gender: {
          type: Sequelize.ENUM("M", "F"),
          allowNull: true,
          validate: {
            isIn: [["M", "F"]]
          }
        },
        birthday: {
          type: Sequelize.DATEONLY,
          allowNull: true
        },
        profileImgUrl: {
          type: Sequelize.STRING,
          allowNull: true
        },
        hashed_password: Sequelize.STRING,
        salt: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      })
    ]).then(() =>
      Promise.all([
        queryInterface.createTable("ApplicantJob", {
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          JobId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Jobs",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.createTable("ApplicantIndustry", {
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          IndustryId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Industries",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.createTable("ApplicantCertification", {
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          Certificationid: {
            type: Sequelize.INTEGER,
            references: {
              model: "Certifications",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.createTable("ApplicantSkills", {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          SkillId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Skills",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          yearsExperience: Sequelize.STRING,
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.addColumn("Applicants", "UserId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("EducationExperiences", "ApplicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicants",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("JobExperiences", "ApplicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicants",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Matches", "ApplicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicants",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Matches", "JobId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Jobs",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Jobs", "IndustryId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Industries",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        })
      ])
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropAllTables();
  }
};
