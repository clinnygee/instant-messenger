const conn = require('../connection/conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Comment = Sequelize.define('comment', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    text: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
});

module.exports = Comment;