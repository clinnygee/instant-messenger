`use strict`;

module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            unique: true,
            primaryKey: true,
        }
    

    
}, {});
    Conversation.associate() = models => {
        // associations can be defined here
    }
}