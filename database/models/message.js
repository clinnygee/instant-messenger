'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    conversation_id: {

    },
    from_id: {

    },
    
    message: {
        type: DataTypes.STRING,

    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};