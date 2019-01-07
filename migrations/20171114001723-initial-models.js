"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable("Applicant", {
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
      queryInterface.createTable("Certification", {
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
      queryInterface.createTable("EducationExperience", {
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
      queryInterface.createTable("Industry", {
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
      queryInterface.createTable("Job", {
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
      queryInterface.createTable("JobExperience", {
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
      queryInterface.createTable("Match", {
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
      queryInterface.createTable("Skill", {
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
      queryInterface.createTable("IndustrySector", {
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
      queryInterface.createTable("User", {
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
        activated: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        hashed_password: Sequelize.STRING,
        salt: Sequelize.STRING,
        userType: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      })
    ]).then(() =>
      Promise.all([
        queryInterface.createTable("ApplicantJob", {
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicant",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          JobId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Job",
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
              model: "Applicant",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          IndustryId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Industry",
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
              model: "Applicant",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          CertificationId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Certification",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.createTable("ApplicantSkill", {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicant",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          SkillId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Skill",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          yearsExperience: Sequelize.STRING,
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.createTable("ApplicantIndustrySector", {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicant",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          IndustrySectorId: {
            type: Sequelize.INTEGER,
            references: {
              model: "IndustrySector",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          yearsExperience: Sequelize.STRING,
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.addColumn("Applicant", "UserId", {
          type: Sequelize.INTEGER,
          references: {
            model: "User",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("EducationExperience", "ApplicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicant",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("JobExperience", "ApplicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicant",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Match", "ApplicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicant",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Match", "JobId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Job",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Job", "IndustryId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Industry",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("IndustrySector", "IndustryId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Industry",
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
