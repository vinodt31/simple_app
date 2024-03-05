const {Sequelize, sequelize, DataTypes} = require("./database.config");


const User = sequelize.define("users",{
    first_name: {type:DataTypes.STRING, allowNull: false},
    last_name: {type:DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phone_no: {type: DataTypes.STRING, allowNull: false},
    parent_id: {type: DataTypes.INTEGER, allowNull: false},
    country: {type: DataTypes.INTEGER, allowNull: false},
    city: {type: DataTypes.INTEGER, allowNull: false},
    pincode: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    token: {type: DataTypes.STRING, allowNull: true}
}
);

module.exports = User;

