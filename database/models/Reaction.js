const conn = require('../connection/conn');
const {Op} = require('sequelize');

const Reacton = conn.define('reaction', {
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

Reaction.createReaction = (reaction, message, sender) => {
    return Promise.all([
        Reaction.createReaction({
            reaction,
            user: {
                _id: sender.id,
                username: sender.username,
            }
        }),
        conn.models.message.findAll({where: {_id: message._id}})
    ]).then(([reaction, message]) => {
        reaction.setMessage(message)
    })
};

module.exports = Reaction;