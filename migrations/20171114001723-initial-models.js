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
        }
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
        }
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
          type: Sequelize.INTEGER,
          allowNull: true
        },
        educationLevel: {
          type: Sequelize.STRING,
          allowNull: true
        },
        university: {
          type: Sequelize.STRING,
          allowNull: true
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        salt: Sequelize.STRING
      })
    ]).then(() =>
      Promise.all([
        queryInterface.createTable("ApplicantJob", {
          applicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          jobId: {
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
          applicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          industryId: {
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
          applicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          certificationid: {
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
        queryInterface.createTable("ApplicantSkill", {
          applicantId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Applicants",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          skillId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Skills",
              key: "id"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        }),
        queryInterface.addColumn("Applicants", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("EducationExperiences", "applicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicants",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("JobExperiences", "applicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicants",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Matches", "applicantId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Applicants",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        }),
        queryInterface.addColumn("Jobs", "industryId", {
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
