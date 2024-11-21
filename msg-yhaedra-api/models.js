const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_ADDON_DB, process.env.POSTGRESQL_ADDON_USER, process.env.POSTGRESQL_ADDON_PASSWORD, {
    host: process.env.POSTGRESQL_ADDON_HOST,
    port: parseInt(process.env.POSTGRESQL_ADDON_PORT),
    dialect: 'postgres',
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    imgUrl: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    contenu: { type: DataTypes.TEXT, allowNull: false },
});

const Conversation = sequelize.define('Conversation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
});

const ConversationUser = sequelize.define('ConversationUser', {
    conversationId: {
        type: DataTypes.UUID,
        references: {
            model: Conversation,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});

Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

User.hasMany(Message, { foreignKey: 'expediteurId', as: 'messages' });
Message.belongsTo(User, { foreignKey: 'expediteurId', as: 'expediteur' });

Conversation.belongsToMany(User, {
    through: ConversationUser,
    as: 'participants',
    foreignKey: 'conversationId',
});
User.belongsToMany(Conversation, {
    through: ConversationUser,
    as: 'conversations',
    foreignKey: 'userId',
});

sequelize.sync({ alter: true });

module.exports = { sequelize, User, Message, Conversation, ConversationUser };

