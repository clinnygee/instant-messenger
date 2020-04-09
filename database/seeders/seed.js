// const conn = require('./database').conn;
const {User, Conversation, Message} = require('../../database').models;

const seedDb = async () => {
    const user1 = await User.createUser('Clinnygee', 'clinton2', 10);
    console.log(user1);

    const user2 = await User.createUser('Jason', 'clinton2', 10);

    const user3 = await User.createUser('Joseph', 'clinton2', 10);

    // User.findOne({where: {username: 'Clinnygee'}}).then(user1 => {
    //     console.log(user1.dataValues)
    //     User.findOne({where: {username: 'Jason'}}).then(user2 => {
            
    //         console.log(user2.dataValues)
    //         Message.createMessage('a test message', user1.dataValues, user2.dataValues).then(message => {
    //             console.log(message);
    //         })
    //         console.log(user2.dataValues)
    //     })
    // })

    // Message.createMessage('a test message', )
    // await Promise.all([
        
    // ])

    // User.createUser('Clinnygee', 'clinton2', 10)
    // User.create()
    // Message.findAll({where: {user: {id: 3}}}).then(message => {
    //     console.log('------------------------------------')
    //     console.log(message);
    // })
}

module.exports = seedDb;