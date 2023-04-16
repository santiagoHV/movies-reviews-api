const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const bcrypt = require('bcryptjs');

const ROLES = ['user', 'admin']

class Users extends Model {
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

Users.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: Sequelize.ENUM(ROLES)
}, {
    sequelize,
    modelName: 'Users'
})

Users.beforeCreate(async(user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

Users.comparePassword = () => {

}

module.exports = Users