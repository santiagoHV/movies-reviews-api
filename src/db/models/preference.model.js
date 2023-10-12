const { Model, DataTypes } = require('sequelize')
const { USER_TABLE } = require('./user.model')
const { CATEGORY_TABLE } = require('./category.model')

const PREFERENCE_TABLE = 'preferences'

const preferenceSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        }
    },
}

class Preference extends Model {
    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Preference',
            tableName: PREFERENCES_TABLE,
            timestamps: true
        }
    }
}



module.exports = { Preference, preferenceSchema, PREFERENCE_TABLE }