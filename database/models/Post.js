const conn = require('../connection/conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Post = conn.define('post', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    text: {
        type: Sequelize.STRING,
    },
    contentUrl: {
        type: Sequelize.STRING,
    }
});


module.exports = Post;