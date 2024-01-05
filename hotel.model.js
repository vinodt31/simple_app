const {Sequelize, sequelize, DataTypes} = require("./database.config");

const Hotel = sequelize.define("hotels",{
    name: {type:DataTypes.STRING, allowNull: false},
    hotel_type: {type:DataTypes.ENUM, values: ["chain","single"]}, //chain, single
    country: {type: DataTypes.INTEGER, allowNull: false},
    state: {type: DataTypes.INTEGER, allowNull: false},
    city: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.STRING},
    pincode: {type: DataTypes.INTEGER, allowNull: false},
    currency: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER,},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
}
);

module.exports = Hotel;
