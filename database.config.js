const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes }  = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql'
      }
  );

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(0)
  });

 let db = {};
 db.sequelize = sequelize
 db.Sequelize = Sequelize
 db.DataTypes = DataTypes


module.exports = db
