const conn = require('../connection/conn');
const {Sequelize} = conn;

const Tag = conn.define('tag', {
    
    tag: {
        type: Sequelize.STRING,
    },
    
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
}, {
    freezeTableName: true,
});

Tag.findOneOrCreate = (tag) => {
    console.log(tag);

    return Tag.findOne({where: {tag: tag}}).then(foundTag => {
        console.log(foundTag);

        if(foundTag){
            return foundTag;
        } else {
            return Tag.create({tag: tag})
        }
    })

};

module.exports = Tag;