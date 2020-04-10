const conn = require('../connection/conn');
const bcrypt = require('bcrypt');

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
    }, 
    profileImgUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://picsum.photos/100',
    }
}, {
    freezeTableName: true,
});

User.createUser = async (username, password, saltRounds) => {
    let userObject = null;
    await bcrypt.hash(password, saltRounds, (err, hash) => {
        User.create({
            username: username,
            password: hash,
        }).then((user) => {
            // console.log(user);
            return user;
            console.log(user)
        })
    });
    
    return userObject;
}

module.exports = User;