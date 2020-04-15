const conn = require('../connection/conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Comment = conn.define('comment', {
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