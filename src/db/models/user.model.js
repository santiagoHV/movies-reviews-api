const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

const USER_TABLE = 'users';
const ROLES = ['user', 'admin']


const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY,
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
    role: {
        type: DataTypes.ENUM(...ROLES),
        defaultValue: 'user',
        allowNull: false
    },
    isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}
class User extends Model {

    static associate(models) {
        User.hasMany(models.Review, {
            foreignKey: 'userId',
            as: 'review'
        })

        User.belongsToMany(models.Category, {
            through: models.Preference,
            foreignKey: 'userId',
            otherKey: 'categoryId',
            as: 'categories'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'User',
            tableName: USER_TABLE,
            timestamps: true
        }
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    async becomeAdmin() {
        this.role = 'admin'
        await this.save()
    }
}

module.exports = { User, userSchema, USER_TABLE }