const conn = require('../connection/conn');
const {Sequelize} = conn;

const Reaction = conn.define('reaction', {
    reaction: Sequelize.STRING,
    user: Sequelize.JSON,
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
}, {
    freezeTableName: true,
});

Reaction.createReaction = (reaction, messageId, sender) => {
    return Promise.all([
        Reaction.create({
            reaction,
            user: {
                _id: sender.id,
                username: sender.username,
            }
        }),
        conn.models.message.findOne({where: {_id: messageId}})
    ]).then(([reaction, message]) => {
        console.log(reaction);
        console.log(message);
        return reaction.setMessage(message)
    })
};

module.exports = Reaction;