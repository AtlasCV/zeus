const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: true,
    validate: {
      isIn: [['M', 'F']]
    }
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  profileImgUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.VIRTUAL,
    set: function set(val) {
      this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
      this.setDataValue('salt', this.makeSalt());
      this.setDataValue('hashed_password', this.encryptPassword(val));
    },
    validate: {
      isLongEnough: function isLongEnough(val) {
        if (val.length < 7) {
          throw new Error('Please choose a longer password');
        }
      }
    }
  },
  hashed_password: DataTypes.STRING,
  salt: DataTypes.STRING,
}, {
  instanceMethods: {
    authenticate: function authenticate(plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
    },
    makeSalt: function() {
      (Math.round((new Date().valueOf() * Math.random())) + '')
    },
    encryptPassword: function encryptPassword(password) {
      if (!password) return '';
      try {
        return crypto
          .createHmac('sha1', this.salt)
          .update(password)
          .digest('hex');
      } catch (err) {
        return '';
      }
    }
  }
});