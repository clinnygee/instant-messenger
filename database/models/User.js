const conn = require('../connection/conn');

const {Sequelize} = conn;

const User = conn.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false, 
    } 
});

module.exports = User;