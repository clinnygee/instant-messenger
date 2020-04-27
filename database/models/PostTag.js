const conn = require('../connection/conn');
const {Sequelize} = conn;

const PostTag = conn.define('posttag', {
   
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    // tagId: {
    //     type: Sequelize.UUID,
        
    // },
    // PostId: {
    //     type: Sequelize.UUID,
    // }
}, {
    freezeTableName: true,
});

module.exports = PostTag;